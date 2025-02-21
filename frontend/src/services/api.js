import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})
async function baseQueryWithReauth(args, api, extraOptions) {

    let result = await baseQuery(args, api, extraOptions);
    if (result.error && (result.error.status === 401 || result.error.status === 403)) {
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
        if (refreshResult.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }));
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult.error.status === 403 || refreshResult.error.status === 401) {
                refreshResult.error.data.message = 'Your login is expired. '
                return refreshResult
            }
        }

    }
    return result;
}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Goals', 'Todo', 'Plan', 'Notes'],
  
})