import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://gurjar-xndl7.ondigitalocean.app',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    reducerPath: 'adminApi',
    tagType: [],
    endpoints: (builder) => ({
        getGurjarUsers: builder.query({
            query: ()=>'gurjar/users'
        }),
        deleteGurjarUser: builder.mutation({
            query: (id) => ({
                url: `gurjar/gurjar_user/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
                useGetGurjarUsersQuery,
                useDeleteGurjarUserMutation
            } = api;