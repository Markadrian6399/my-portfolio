import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: ''
    },
    reducers:{
        update: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { update } = themeSlice.actions
export default themeSlice.reducer
