import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './MainRoutes.styl'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Main from '@/pages/Main'
import Personal from '@/pages/Personal'

const MainRoutes = () =>
  <BrowserRouter>
    <Routes className='routes'>
      <Route path='/' element={<Main />} />
      <Route path='personal' element={<Personal />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </BrowserRouter>
MainRoutes.propTypes = {
}

export default memo(MainRoutes)
