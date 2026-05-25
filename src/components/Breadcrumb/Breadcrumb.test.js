import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

jest.mock(
  '@com/Buttons/TextButton',
  () =>
    function MockTextButton({ children, onClick }) {
      return <button onClick={onClick}>{children}</button>
    },
  { virtual: true }
)

const createStore = () =>
  configureStore({
    reducer: {
      showCn: () => true,
      showEx: () => false,
      showQa: () => false,
      showLs: () => false,
      displayType: () => 'jp',
      showNt: () => false,
      showAn: () => false,
      typeMode: () => 'hiragana'
    }
  })

const renderBreadcrumb = props =>
  render(
    <Provider store={createStore()}>
      <MemoryRouter>
        <Breadcrumb {...props}>返回</Breadcrumb>
      </MemoryRouter>
    </Provider>
  )

describe('Breadcrumb', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('routes jp top-level breadcrumbs targeting root to jlpt', () => {
    renderBreadcrumb({ to: '/', noTop: true, type: 'jp' })

    fireEvent.click(screen.getByRole('button', { name: '返回' }))

    expect(mockNavigate).toHaveBeenCalledWith('/jlpt')
  })

  it('keeps non-jp root breadcrumbs targeting root unchanged', () => {
    renderBreadcrumb({ to: '/', noTop: true })

    fireEvent.click(screen.getByRole('button', { name: '返回' }))

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('adds semantic wrap class for wrapped breadcrumb layout', () => {
    const { container } = renderBreadcrumb({
      to: '/',
      noTop: true,
      wrap: true
    })

    expect(container.firstChild).toHaveClass('com-breadcrumb', 'is-wrap')
  })

  it('does not trigger selector stability warnings during render', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    renderBreadcrumb({ to: '/', noTop: true, wrap: true })

    expect(warnSpy).not.toHaveBeenCalledWith(
      expect.stringContaining(
        'Selector unknown returned a different result when called with the same parameters.'
      ),
      expect.anything()
    )
  })

  it('adds on-click class to clickable jp toggles', () => {
    renderBreadcrumb({
      to: '/',
      noTop: true,
      type: 'jp',
      ai: true,
      qa: true,
      ex: true,
      ls: true
    })

    ;['an', 'nt', 'hiragana', 'qa', 'ex', 'ls', 'cn', 'jp'].forEach(text => {
      expect(screen.getByText(text)).toHaveClass('on-click')
    })
  })
})
