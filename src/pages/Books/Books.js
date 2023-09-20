import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './Books.styl'
import books from '@/consts/books'

const Books = () =>
  <div className='pg-books'>
    {
      books.map(
        ({ title, cover, author, illustrator, id }) =>
          <div key={id} className='pg-books_item'>
            <img src={cover} alt='cover' />
            <p className='pg-books_title'>{ title }</p>
            <p>{ author }</p>
            { illustrator && <p>{ illustrator }</p> }
          </div>
      )
    }
  </div>
Books.propTypes = {
}

export default memo(Books)
