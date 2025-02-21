import { apiSlice } from "../../services/api";

export const todoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodo: builder.query({
            query: (date) => `todo/${date.year}/${date.month}/${date.day}`,
            providesTags: ['Todo']
        }),
        createTodo: builder.mutation({
            query: ({todo, date}) => {
                return {
                url: `todo/${date.year}/${date.month}/${date.day}/new`,
                method: 'PATCH',
                body: { ...todo }
            }},
            invalidatesTags:['Todo']
        }),
        editTodo: builder.mutation({
            query:({todo, date}) => {
                return {
                url: `todo/${date.year}/${date.month}/${date.day}/${todo.taskId}`,
                method: 'PATCH',
                body: { ...todo }
            }},
            invalidatesTags:['Todo']
        }),
        deleteTask: builder.mutation({
            query:({taskId, date})=>({
                url: `todo/${date.year}/${date.month}/${date.day}/${taskId}`,
                method: 'DELETE',
            })
        })
    })
})

export const { useGetTodoQuery, useCreateTodoMutation, useEditTodoMutation, useDeleteTaskMutation } = todoApiSlice