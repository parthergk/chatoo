import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./roomSlice";


const store = configureStore ({
    reducer : {
        room : roomSlice
    }
})

export default store;