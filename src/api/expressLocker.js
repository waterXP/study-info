import api from './index'

export const findUser = p => api.get('/expressLocker/findUser', p)

export default null
