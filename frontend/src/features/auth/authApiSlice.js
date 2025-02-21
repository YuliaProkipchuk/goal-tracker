import { apiSlice } from "../../services/api";
import { getGoalsID } from "../goals/goalSlice";
import { setCredentials } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: "POST",
                body: { ...credentials }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { goalIds } = data;
                    dispatch(getGoalsID(goalIds))
                } catch (error) {
                    console.log(error);

                }
            }
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: 'auth/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST'
            })
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken, goalIds } = data;
                    dispatch(setCredentials({ accessToken }))
                    dispatch(getGoalsID(goalIds))
                } catch (error) {
                    console.log(error);

                }
            }

        }),

    })
})
export const { useLoginMutation, useLogoutMutation, useSignupMutation, useRefreshMutation} = authApiSlice
