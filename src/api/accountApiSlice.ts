import { apiSlice } from "./apiSlice"

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAccounts: builder.query({
            query: () => '/accounts'
        }),
        addAccount: builder.mutation({
            query: account => ({
                url: '/accounts',
                method: 'POST',
                body: { ...account }
            })
        }),
        editAccount: builder.mutation({
            query: ({id, ...account}) => ({
                url: `/accounts/${id}`,
                method: 'PUT',
                body: account
            })
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `/accounts/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetAccountsQuery, useAddAccountMutation, useEditAccountMutation, useDeleteAccountMutation } = accountApiSlice