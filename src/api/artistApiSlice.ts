import { apiSlice } from "./apiSlice"

export const artistApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArtists: builder.query({
            query: () => '/artists'
        }),
        addArtist: builder.mutation({
            query: artist => ({
                url: '/artists',
                method: 'POST',
                body: { ...artist }
            })
        }),
        editArtist: builder.mutation({
            query: ({id, ...artist}) => ({
                url: `/artists/${id}`,
                method: 'PUT',
                body: artist
            })
        }),
        deleteArtist: builder.mutation({
            query: (id) => ({
                url: `/artists/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetArtistsQuery, useAddArtistMutation, useEditArtistMutation, useDeleteArtistMutation } = artistApiSlice