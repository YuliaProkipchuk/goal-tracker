import { apiSlice } from "../../services/api";

export const goalsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGoalById: builder.query({
            query: (id) => `goals/${id}`
        }),
        getGoals: builder.query({
            query: (searchTerm) => `goals/search?q=${searchTerm}`,
            providesTags: ['Goals'],

        }),

        addGoal: builder.mutation({
            query: (goal) => ({
                url: 'goals/new',
                method: 'POST',
                body: { ...goal }
            }),
            invalidatesTags: ['Goals']
        })
    })
})

export const { useAddGoalMutation, useGetGoalByIdQuery, useGetGoalsQuery } = goalsApiSlice