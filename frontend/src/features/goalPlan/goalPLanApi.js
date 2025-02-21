import { apiSlice } from "../../services/api";

export const goalPLanApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPlan: builder.query({
            query: (goalId) => `goals/${goalId}/plan`
        }),
        addStep: builder.mutation({
            query: ({ goalId, data }) => ({
                url: `goals/${goalId}/plan/new`,
                method: 'POST',
                body: { ...data }
            })
        }),
        mutateStep: builder.mutation({
            query: ({ goalId, data, stepId }) => ({
                url: `goals/${goalId}/plan/${stepId}`,
                method: 'PATCH',
                body: { ...data }
            })
        }),
        deleteStep: builder.mutation({
            query:({goalId, stepId})=>({
                url: `goals/${goalId}/plan/${stepId}`,
                method:'DELETE'
            })
        })
    })
})

export const {useGetPlanQuery, useAddStepMutation, useDeleteStepMutation, useMutateStepMutation} = goalPLanApi