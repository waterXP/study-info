import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './MainRouter.styl'
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Cabinet from '@/pages/Cabinet'
import CabinetPick from '@/pages/CabinetPick'
import CabinetPickCode from '@/pages/CabinetPickCode'
import CabinetPickList from '@/pages/CabinetPickList'
import CabinetSave from '@/pages/CabinetSave'
import CabinetSaveQuery from '@/pages/CabinetSaveQuery'

const { PUBLIC_URL } = process.env

const router = createHashRouter(
  [
    {
      path: '/',
      element: <Cabinet />
    },
    {
      path: 'pick',
      element: <CabinetPick />
    },
    {
      path: 'pick-code',
      element: <CabinetPickCode />
    },
    {
      path: 'pick-list',
      element: <CabinetPickList />
    },
    {
      path: 'save',
      element: <CabinetSave />
    },
    {
      path: 'save-query',
      element: <CabinetSaveQuery />
    },
    {
      path: '*',
      element: <Navigate to='/' replace />
    }
  ],
  { basename: PUBLIC_URL || '' }
)

const MainRouter = () => <RouterProvider router={router} />

export default memo(MainRouter)
