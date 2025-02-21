import { apiSlice } from "../../services/api";
// import { getGoalsID } from "./goalSlice";

export const goalsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGoalById: builder.query({
            query: (id) => `goals/${id}`
        }),
        getGoals: builder.query({
            query: (searchTerm) => `goals/search?q=${searchTerm}`,
            providesTags: ['Goals'],

            // async onQueryStarted(args, { dispatch, queryFulfilled }) {
            //     const { data } = await queryFulfilled;
            //     const ids = data.goals.map(goal => ({ id: goal._id, name: goal.name }))
            //     dispatch(getGoalsID(ids))
            // }
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