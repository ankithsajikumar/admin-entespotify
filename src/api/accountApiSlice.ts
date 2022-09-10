import { apiSlice } from "./apiSlice"

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAccounts: builder.query({
            query: () => '/accounts'
        })
    })
})

export const { useGetAccountsQuery } = accountApiSlice