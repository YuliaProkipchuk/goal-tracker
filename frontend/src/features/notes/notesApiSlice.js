import { apiSlice } from "../../services/api";

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: (searchTerm) => `/notes/search?q=${searchTerm}`,
            providesTags: ['Notes']
        }),
        getNoteById: builder.query({
            query: (noteId) => `/notes/${noteId}`
        }),
        createNote: builder.mutation({
            query: (data) => ({
                url: `/notes/new`,
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ['Notes']
        }),
        editNote: builder.mutation({
            query: ({ noteId, data }) => ({
                url: `/notes/${noteId}`,
                method: 'PATCH',
                body: { ...data }
            }),
            invalidatesTags: ['Notes']
        }),
        deleteNote: builder.mutation({
            query: (noteId) => ({
                url: `/notes/${noteId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notes']

        })
    })
})

export const { useGetNotesQuery, useGetNoteByIdQuery, useCreateNoteMutation, useDeleteNoteMutation, useEditNoteMutation } = notesApiSlice;