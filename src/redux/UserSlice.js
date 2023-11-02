import {createSlice} from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userRedux: null,
  },
  reducers: {
    //     addUser: (state,action) => {
    //             state.users.push(action.payload)
    //         },
    //     deleteUser: (state,action) => {
    //         state.users = state.users.filter(user => {
    //             return user.id !== action.payload;
    //         })
    //     },
    //     updateUser: function (state,action) {
    //         state.users.map(user => {
    //             if(user.id === action.payload.id) {
    //             user.title = action.payload.title;
    //             user.desc = action.payload.desc;
    //             }
    //         })
    //     }
    setUser: (state, action) => {
      state.userRedux = action.payload;
    },
  },
});

export const {setUser} = UserSlice.actions;
export default UserSlice.reducer;
