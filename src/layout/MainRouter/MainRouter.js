import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import './MainRouter.styl'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Main from '@/pages/Main'
import Overview from '@/pages/Overview'
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
import Others from '@/pages/Others'
import Performance from '@/pages/Performance'
import ActiveITTO from '@/pages/ActiveITTO'
import JP from '@/pages/JP'
import JPFavorites from '@/pages/JPFavorites'
import JPWordsList from '@/pages/JPWordsList'
import JPWords from '@/pages/JPWords'
import JPCourse from '@/pages/JPCourse'
import JPTables from '@/pages/JPTables'
import JPTable from '@/pages/JPTable'
import JPNotes from '@/pages/JPNotes'
import JPNote from '@/pages/JPNote'
import JPPpts from '@/pages/JPPpts'
import JPPpt from '@/pages/JPPpt'
import JPN2s from '@/pages/JPN2s'
import JPN2 from '@/pages/JPN2'
import JPN2Words from '@/pages/JPN2Words'
import JPN2Word from '@/pages/JPN2Word'
import JPN2Study from '@/pages/JPN2Study'
import Deprive from '@/pages/Deprive'
import Deprive2 from '@/pages/Deprive2'
import JPExec from '@/pages/JPExec'

const { PUBLIC_URL } = process.env

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Main />
    },
    {
      path: 'overview',
      element: <Overview />
    },
    {
      path: 'chapter',
      element: <Chapter />
    },
    {
      path: 'itto',
      element: <ITTO />
    },
    {
      path: 'active-itto',
      element: <ActiveITTO />
    },
    {
      path: 'noun',
      element: <Noun />
    },
    {
      path: 'menu',
      element: <Menu />
    },
    {
      path: 'point',
      element: <Point />
    },
    {
      path: 'cases',
      element: <Cases />
    },
    {
      path: 'case',
      element: <Case />
    },
    {
      path: 'papers',
      element: <Papers />
    },
    {
      path: 'paper',
      element: <Paper />
    },
    {
      path: 'wash',
      element: <Wash />
    },
    {
      path: 'others',
      element: <Others />
    },
    {
      path: 'performance',
      element: <Performance />
    },
    {
      path: 'jp-favorites',
      element: <JPFavorites />
    },
    {
      path: 'jp-words-list',
      element: <JPWordsList />
    },
    {
      path: 'jp-words',
      element: <JPWords />
    },
    {
      path: 'jp-course',
      element: <JPCourse />
    },
    {
      path: 'jp-tables',
      element: <JPTables />
    },
    {
      path: 'jp-table',
      element: <JPTable />
    },
    {
      path: 'jp-notes',
      element: <JPNotes />
    },
    {
      path: 'jp-note',
      element: <JPNote />
    },
    {
      path: 'jp-ppts',
      element: <JPPpts />
    },
    {
      path: 'jp-ppt',
      element: <JPPpt />
    },
    {
      path: 'jp-n2s',
      element: <JPN2s />
    },
    {
      path: 'jp-n2',
      element: <JPN2 />
    },
    {
      path: 'jp-exec',
      element: <JPExec />
    },
    {
      path: 'jp',
      element: <JP />
    },
    {
      path: 'jp-n2-words',
      element: <JPN2Words />
    },
    {
      path: 'jp-n2-word',
      element: <JPN2Word />
    },
    {
      path: 'jp-n2-study',
      element: <JPN2Study />
    },
    {
      path: 'deprive',
      element: <Deprive />
    },
    {
      path: 'deprive2',
      element: <Deprive2 />
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
