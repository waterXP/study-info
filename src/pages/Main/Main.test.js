import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Main from './Main'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Main', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders the two primary entry rows with helper descriptions', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    )

    expect(screen.getByText('软考')).toBeInTheDocument()
    expect(screen.getByText('项目管理与软考资料入口')).toBeInTheDocument()
    expect(screen.getByText('JLPT')).toBeInTheDocument()
    expect(screen.getByText('日语学习与题库整理入口')).toBeInTheDocument()
  })

  it('navigates from each entry row', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('软考'))
    fireEvent.click(screen.getByText('JLPT'))

    expect(mockNavigate).toHaveBeenNthCalledWith(1, '/gaoxiang')
    expect(mockNavigate).toHaveBeenNthCalledWith(2, '/jlpt')
  })
})
