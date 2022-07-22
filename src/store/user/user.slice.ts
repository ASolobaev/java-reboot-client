import {AddressInterface} from "../../interfaces/address.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserDto} from "../../interfaces/user.dto";
import {UserInterface} from "../../interfaces/user.interface";
import {AppState} from "../app.store";

interface UserState {
  id: number|null;
  user: UserInterface|null;
  address: AddressInterface[];
}

const initialState: UserState = {
  id: null,
  user: null,
  address: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserDto>) => {
      state.id = action.payload.id;
      state.user = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        middleName: action.payload.middleName,
        fullName: `${action.payload.firstName} ${action.payload.middleName || ''} ${action.payload.lastName}`
      };
      state.address = action.payload.address;
    }
  }
});

export const {
  setUser,
} = userSlice.actions;

export const selectUser = (state: AppState) => state.user;
export const selectAddress = (state: AppState) => state.user.address;

export default userSlice.reducer;