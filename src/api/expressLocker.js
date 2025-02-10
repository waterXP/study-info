import api from './index'

export const findUser = p => api.get('/expressLocker/findUser', p)

export const getAvailableLockerBox = p => api.get('/expressLocker/getAvailableLockerBox', p)

export const saveExpress = p => api.post('/expressLocker/saveExpress', p)

export const findWaitTakeList = p => api.get('/expressLocker/findWaitTakeList', p)

export const takeExpress = p => api.get('/expressLocker/takeExpress', p)

export default null
