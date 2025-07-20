import { createSlice } from '@reduxjs/toolkit';

const requestslice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        }
    }
})

export const { addRequests } = requestslice.actions

export default requestslice.reducer

