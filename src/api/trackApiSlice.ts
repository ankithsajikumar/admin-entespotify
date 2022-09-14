import { apiSlice } from "./apiSlice"

export const trackApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTracks: builder.query({
            query: () => '/tracks'
        }),
        addTrack: builder.mutation({
            query: track => ({
                url: '/tracks',
                method: 'POST',
                body: { ...track }
            })
        }),
        editTrack: builder.mutation({
            query: ({id, ...track}) => ({
                url: `/tracks/${id}`,
                method: 'PUT',
                body: track
            })
        }),
        deleteTrack: builder.mutation({
            query: (id) => ({
                url: `/tracks/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetTracksQuery, useAddTrackMutation, useEditTrackMutation, useDeleteTrackMutation } = trackApiSlice 