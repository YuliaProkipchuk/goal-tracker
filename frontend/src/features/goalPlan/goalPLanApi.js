import { apiSlice } from "../../services/api";

export const goalPLanApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPlan: builder.query({
            query: (goalId) => `goals/${goalId}/plan`,
            providesTags:['Plan']
        }),
        addStep: builder.mutation({
            query: ({ goalId, data }) => ({
                url: `goals/${goalId}/plan/new`,
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags:['Plan']
        }),
        mutateStep: builder.mutation({
            query: ({ goalId, status, stepId }) => ({
                url: `goals/${goalId}/plan/${stepId}`,
                method: 'PATCH',
                body: {status}
            }),
            invalidatesTags:['Plan']

        }),
        deleteStep: builder.mutation({
            query:({goalId, stepId})=>({
                url: `goals/${goalId}/plan/${stepId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Plan']

        })
    })
})

export const {useGetPlanQuery, useAddStepMutation, useDeleteStepMutation, useMutateStepMutation} = goalPLanApi