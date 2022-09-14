import { apiSlice } from "./apiSlice"

export const albumApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAlbums: builder.query({
            query: () => '/albums'
        }),
        addAlbum: builder.mutation({
            query: album => ({
                url: '/albums',
                method: 'POST',
                body: { ...album }
            })
        }),
        editAlbum: builder.mutation({
            query: ({id, ...album}) => ({
                url: `/albums/${id}`,
                method: 'PUT',
                body: album
            })
        }),
        deleteAlbum: builder.mutation({
            query: (id) => ({
                url: `/albums/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetAlbumsQuery, useAddAlbumMutation, useEditAlbumMutation, useDeleteAlbumMutation } = albumApiSlice