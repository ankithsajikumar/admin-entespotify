import { apiSlice } from "./apiSlice"

export const artistApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArtists: builder.query({
            query: () => '/artists'
        })
    })
})

export const { useGetArtistsQuery } = artistApiSlice