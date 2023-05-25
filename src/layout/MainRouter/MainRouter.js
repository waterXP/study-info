import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './MainRouter.styl'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Main from '@/pages/Main'
import Personal from '@/pages/Personal'
import Chapter from '@/pages/Chapter'
import ITTO from '@/pages/ITTO'
import Noun from '@/pages/Noun'
import Menu from '@/pages/Menu'
import Point from '@/pages/Point'
import Cases from '@/pages/Cases'
import Case from '@/pages/Case'
import Papers from '@/pages/Papers'
import Paper from '@/pages/Paper'
import Wash from '@/pages/Wash'

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
      path: 'noun',
      element: <Noun />
    }, {
      path: 'menu',
      element: <Menu />
    }, {
      path: 'point',
      element: <Point />
    }, {
      path: 'cases',
      element: <Cases />
    }, {
      path: 'case',
      element: <Case />
    }, {
      path: 'papers',
      element: <Papers />
    }, {
      path: 'paper',
      element: <Paper />
    }, {
      path: 'wash',
      element: <Wash />
    }, {
      path: '*',
      element: <Navigate to='/' replace />
    }
  ],
  { basename: PUBLIC_URL || '' }
)

const MainRouter = () => <RouterProvider router={router} />

export default memo(MainRouter)
