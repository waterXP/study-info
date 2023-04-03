import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './MainRouter.styl'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Main from '@/pages/Main'
import Personal from '@/pages/Personal'
import Chapter from '@/pages/Chapter'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  }, {
    path: 'chapter',
    element: <Chapter />
  }, {
    path: 'personal',
    element: <Personal />
  }, {
    path: '*',
    element: <Navigate to='/' replace />
  }
])

const MainRouter = () => <RouterProvider router={router} />

export default memo(MainRouter)
