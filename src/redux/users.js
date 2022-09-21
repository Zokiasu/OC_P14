import { createSlice } from "@reduxjs/toolkit"

export const usersSlice = createSlice({
	name: "users",
	
	initialState: {
		users: []
	},

	reducers : {
		newUser: (state, action) => {
			console.log('action.payload', action.payload)
			state.users.push(action.payload)
		}
	}
})

export const { newUser } = usersSlice.actions
export default usersSlice.reducer