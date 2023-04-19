import { configureStore } from '@reduxjs/toolkit'
import main from './reducers/main'

const store = configureStore({ reducer: main })

export default store
