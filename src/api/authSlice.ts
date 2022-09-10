import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'

interface UserState {
	token: string,
	refresh: string
}

const initialState: UserState = {
	token: '',
	refresh: ''
}

export const authSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const auth = action.payload
			state.token = auth.accessToken
			state.refresh = auth.refreshToken
			localStorage.setItem("token", auth.accessToken)
			localStorage.setItem("refresh", auth.refreshToken)
		},
		logout: (state) => {
			state.token = ''
			localStorage.removeItem("token")
			localStorage.removeItem("refresh")
		}
	},
})

export const { setCredentials, logout } = authSlice.actions

export const selectCurrentToken = (state: RootState) => state.auth.token

export default authSlice.reducer