import {configureStore} from '@reduxjs/toolkit'
import RoleSlice from './slices/RoleSlice'
const store=configureStore({
    reducer:{
        role:RoleSlice
    }
})
export default store