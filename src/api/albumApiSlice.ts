import { apiSlice } from "./apiSlice"

export const albumApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAlbums: builder.query({
            query: () => '/albums'
        })
    })
})

export const { useGetAlbumsQuery } = albumApiSlice