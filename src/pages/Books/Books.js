import React, { memo, useCallback } from 'react'
// import PropTypes from 'prop-types'
import './Books.styl'
import books from '@/consts/books'
import { useNavigate } from 'react-router-dom'

const Books = () => {
  const navigate = useNavigate()
  const openBook = useCallback(
    id => {
      navigate(`/book?id=${id}`)
    },
    [navigate]
  )
  return <div className='pg-books'>
    {
      books.map(
        ({ id, title, cover, author, illustrator }) =>
          <div key={id} className='pg-books_wrap'>
            <div
              key={id}
              className='pg-books_item is-clickable'
              onClick={() => { openBook(id) }}
            >
              <div className='pg-books_cover-wrap'>
                <img className='pg-books_cover' src={cover} alt='cover' />
              </div>
              <div className='pg-books_info'>
                <p className='pg-books_title'>{ title }</p>
                <p className='pg-books_author'>{ `Author: ${author}` }</p>
                {
                  illustrator &&
                  <p className='pg-books_illustrator'>
                    { `Illustrator: ${illustrator}` }
                  </p>
                }
              </div>
            </div>
          </div>
      )
    }
  </div>
}
Books.propTypes = {
}

export default memo(Books)
