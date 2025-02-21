import { apiSlice } from "../../services/api";


export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUserProfile: builder.query({
            query:()=>'profile'
        }),
        editUserProfile:builder.mutation({
            query:({data})=>({
                url:'profile',
                method:'PATCH',
                body:data
            })
        })
    })
})

export const {useGetUserProfileQuery, useEditUserProfileMutation} = profileApiSlice