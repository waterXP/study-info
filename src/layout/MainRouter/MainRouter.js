import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './MainRouter.styl'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Main from '@/pages/Main'
import Personal from '@/pages/Personal'
import Chapter from '@/pages/Chapter'
import ITTO from '@/pages/ITTO'

const { PUBLIC_URL } = process.env

const router = createBrowserRouter(
  [
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
      path: 'itto',
      element: <ITTO />
    }, {
      path: '*',
      element: <Navigate to='/' replace />
    }
  ],
  { basename: PUBLIC_URL || '' }
)

const MainRouter = () => <RouterProvider router={router} />

export default memo(MainRouter)
