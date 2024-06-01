import {createSlice} from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name : "Room",

    initialState: {
        user : '',
        room : ''
    },

    reducers: {
        addUser : (state,action) => {
            const {user, room } = action.payload
            state.user = user
            state.room = room
        }
    }
})

export const {addUser} = roomSlice.actions;
export default roomSlice.reducer;