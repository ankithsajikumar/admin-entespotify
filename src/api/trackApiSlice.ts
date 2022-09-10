import { apiSlice } from "./apiSlice"

export const trackApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTracks: builder.query({
            query: () => '/tracks',
            keepUnusedDataFor: 1
        }),
        addTrack: builder.mutation({
            query: track => ({
                url: '/tracks',
                method: 'POST',
                body: { ...track }
            })
        })
    })
})

export const { useGetTracksQuery, useAddTrackMutation } = trackApiSlice 