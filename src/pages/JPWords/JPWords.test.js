import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import JPWords from './JPWords'

jest.mock(
  '@/consts/jp',
  () => [
    {
      id: 1,
      lesson: [
        {
          no: 1,
          topic: 'test',
          word: [
            {
              id: 'w-1',
              mana: '食べる',
              kana: 'たべる',
              cn: '吃',
              type: '动1'
            },
            { id: 'w-2', mana: '', kana: '', cn: '空', type: '名' }
          ],
          phrase: []
        }
      ]
    }
  ],
  { virtual: true }
)

jest.mock('@com/Page', () => ({ children }) => <div>{children}</div>, {
  virtual: true
})
jest.mock(
  '@com/Page/Header',
  () => ({ children, title }) => (
    <div>
      <div>{title}</div>
      {children}
    </div>
  ),
  { virtual: true }
)
jest.mock('@com/Page/Content', () => ({ children }) => <div>{children}</div>, {
  virtual: true
})
jest.mock(
  '@com/Page/Footer',
  () => ({ onCenterClick, centerText }) => (
    <button onClick={onCenterClick}>{centerText || 'footer'}</button>
  ),
  { virtual: true }
)
jest.mock(
  '@/components/Word/Word',
  () => ({ word }) => <div>{word?.mana || word?.kana || word?.cn || 'word'}</div>,
  { virtual: true }
)
jest.mock(
  '@com/Icon',
  () => ({ className, type, ...rest }) => (
    <i
      className={[className, 'com-icon iconfont', type].filter(Boolean).join(' ')}
      {...rest}
    />
  ),
  { virtual: true }
)
jest.mock('@com/JPText', () => ({ content, kana, mana, children }) => (
  <span>{content || mana || kana || children}</span>
), { virtual: true })
jest.mock(
  '@/components/Word/Switch',
  () => ({ children, checked, onClick }) => (
    <button
      className={checked ? 'is-checked on-click' : 'on-click'}
      onClick={onClick}
    >
      {children}
    </button>
  ),
  { virtual: true }
)
jest.mock('antd', () => {
  const React = require('react')

  return {
    Modal: ({ children, footer, open }) => (
      open ? (
        <div>
          {children}
          {footer}
        </div>
      ) : null
    ),
    Input: React.forwardRef(({ onPressEnter, onKeyDown, ...props }, ref) => {
      const inputRef = React.useRef(null)

      React.useImperativeHandle(ref, () => ({
        input: inputRef.current,
        focus: () => inputRef.current && inputRef.current.focus(),
        select: () => inputRef.current && inputRef.current.select()
      }))

      return (
        <input
          ref={inputRef}
          onKeyDown={e => {
            if (e.key === 'Enter' && onPressEnter) {
              onPressEnter(e)
            }
            onKeyDown && onKeyDown(e)
          }}
          {...props}
        />
      )
    }),
    message: { error: jest.fn() }
  }
})

const createStore = () =>
  configureStore({
    reducer: {
      favorites: () => ({}),
      displayType: () => 'jp'
    }
  })

const renderPage = (entry = '/jp-words?id=1&no=1&index=0') =>
  render(
    <Provider store={createStore()}>
      <MemoryRouter initialEntries={[entry]}>
        <JPWords />
      </MemoryRouter>
    </Provider>
  )

describe('JPWords', () => {
  let speakMock
  let cancelMock
  let getVoicesMock

  beforeEach(() => {
    speakMock = jest.fn()
    cancelMock = jest.fn()
    getVoicesMock = jest.fn(() => [{ lang: 'ja-JP', name: 'Japanese Voice' }])

    global.SpeechSynthesisUtterance = jest.fn(function MockUtterance(text) {
      this.text = text
    })
    global.speechSynthesis = {
      speak: speakMock,
      cancel: cancelMock,
      getVoices: getVoicesMock
    }
    window.SpeechSynthesisUtterance = global.SpeechSynthesisUtterance
    window.speechSynthesis = global.speechSynthesis
  })

  afterEach(() => {
    delete global.SpeechSynthesisUtterance
    delete global.speechSynthesis
    delete window.SpeechSynthesisUtterance
    delete window.speechSynthesis
  })

  it('shows voice controls and auto-speaks the current japanese text by default', async () => {
    const { container } = renderPage()

    expect(screen.getByText('听')).toBeInTheDocument()
    expect(screen.getByText('voice')).toBeInTheDocument()

    await waitFor(() => {
      expect(speakMock).toHaveBeenCalledTimes(1)
    })

    const utterance = speakMock.mock.calls[0][0]

    expect(utterance.text).toBe('食べる')
    expect(utterance.lang).toBe('ja-JP')

    fireEvent.click(screen.getByText('voice'))

    await waitFor(() => {
      expect(speakMock).toHaveBeenCalledTimes(2)
    })

    fireEvent.click(screen.getByText('默写'))

    const modalVoice = container.querySelector('.pg-jp-words_modal-voice')
    const modalVoiceIcon = container.querySelector(
      '.pg-jp-words_modal-voice-icon'
    )

    expect(modalVoice).not.toBeNull()
    expect(modalVoiceIcon).not.toBeNull()
    expect(modalVoiceIcon.className).toContain('icon-31shengbo')

    fireEvent.click(modalVoice)

    await waitFor(() => {
      expect(speakMock).toHaveBeenCalledTimes(3)
    })
  })

  it('does not submit on enter while ime composition is in progress', async () => {
    const { container } = renderPage()

    fireEvent.click(screen.getByText('默写'))

    const input = container.querySelector('.pg-jp-words_input')

    expect(input).not.toBeNull()

    fireEvent.change(input, { target: { value: 'たべる' } })
    fireEvent.compositionStart(input)
    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      which: 13
    })

    await waitFor(() => {
      expect(screen.getByDisplayValue('たべる')).toBeInTheDocument()
    })

    expect(screen.getByText('食べる')).toBeInTheDocument()
  })

  it('clears recite hint and input when switching modal items', async () => {
    const { container } = renderPage()

    fireEvent.click(screen.getByText('默写'))

    const input = container.querySelector('.pg-jp-words_input')

    expect(input).not.toBeNull()

    fireEvent.change(input, { target: { value: 'たべ' } })
    fireEvent.click(screen.getByText('检查'))

    expect(container.querySelector('.pg-jp-words_input-tip')).not.toBeNull()
    expect(screen.getByDisplayValue('たべ')).toBeInTheDocument()

    fireEvent.click(screen.getByText('下一个'))

    expect(container.querySelector('.pg-jp-words_input-tip')).toBeNull()
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
  })

  it('hides voice controls and skips auto speech when current content has no readable text', async () => {
    renderPage('/jp-words?id=1&no=1&index=1')

    expect(screen.queryByText('听')).toBeNull()
    expect(screen.queryByText('voice')).toBeNull()

    await waitFor(() => {
      expect(speakMock).not.toHaveBeenCalled()
    })
  })

  it('hides voice controls when speech synthesis is unavailable', async () => {
    delete global.SpeechSynthesisUtterance
    delete global.speechSynthesis

    renderPage()

    expect(screen.queryByText('听')).toBeNull()
    expect(screen.queryByText('voice')).toBeNull()

    await waitFor(() => {
      expect(speakMock).not.toHaveBeenCalled()
    })
  })
})
