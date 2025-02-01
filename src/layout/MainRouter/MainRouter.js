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
import JPStructure from '@/pages/JPStructure'
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
import Deprive3 from '@/pages/Deprive3'
import JPExec from '@/pages/JPExec'
import JPListens from '@/pages/JPListens'
import JPListen from '@/pages/JPListen'
import JPGrammars from '@/pages/JPGrammars'
import JPGrammarChapter from '@/pages/JPGrammarChapter'
import JPGrammar from '@/pages/JPGrammar'
import JPGrammarsExec from '@/pages/JPGrammarsExec'
import JPGrammarExec from '@/pages/JPGrammarExec'
import Cabinet from '@/pages/Cabinet'
import CabinetPick from '@/pages/CabinetPick'
import CabinetPickCode from '@/pages/CabinetPickCode'
import CabinetPickList from '@/pages/CabinetPickList'
import CabinetSave from '@/pages/CabinetSave'
import CabinetSaveQuery from '@/pages/CabinetSaveQuery'

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
      path: 'jp-structure',
      element: <JPStructure />
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
      path: 'jp-listens',
      element: <JPListens />
    },
    {
      path: 'jp-listen',
      element: <JPListen />
    },
    {
      path: 'jp-grammars',
      element: <JPGrammars />
    },
    {
      path: 'jp-grammar-chapter',
      element: <JPGrammarChapter />
    },
    {
      path: 'jp-grammar',
      element: <JPGrammar />
    },
    {
      path: 'jp-grammars-exec',
      element: <JPGrammarsExec />
    },
    {
      path: 'jp-grammar-exec',
      element: <JPGrammarExec />
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
      path: 'deprive3',
      element: <Deprive3 />
    },
    {
      path: 'cabinet',
      element: <Cabinet />
    },
    {
      path: 'cabinet-pick',
      element: <CabinetPick />
    },
    {
      path: 'cabinet-pick-code',
      element: <CabinetPickCode />
    },
    {
      path: 'cabinet-pick-list',
      element: <CabinetPickList />
    },
    {
      path: 'cabinet-save',
      element: <CabinetSave />
    },
    {
      path: 'cabinet-save-query',
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
