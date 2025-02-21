import { createSlice } from "@reduxjs/toolkit";

export const goalSlice = createSlice({
    name:'goals',
    initialState:{
        goalsIds:[]
    },
    reducers:{
        getGoalsID:(state, action)=>{
            state.goalsIds = action.payload
        }
    }
})

export const {getGoalsID} = goalSlice.actions
export const selectAllGoalsIds = (state)=>state.goals.goalsIds
export default goalSlice.reducer
