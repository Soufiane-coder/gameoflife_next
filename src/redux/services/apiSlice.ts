// apiSlice.js
import { getUserData } from '@/lib/firebase/user.apis';
import { createApi, fakeBaseQuery, } from '@reduxjs/toolkit/query/react';
// import { db } from '@/lib/firebase/firebaseConfig'; // Import db object

// const initial

export const fireStoreApi = createApi({
    reducerPath: 'firestoreApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getUser: builder.query({
            queryFn: async ({user}) => {
                console.log({user})
                // const data = await getUserData(user)
                return {data: {}}
            }
        }),
        getRoutines: builder.query<Array<any>, void>({
            queryFn: async () => await (new Promise((resolve) => resolve({data: [{routine: 'r'}]})))
        }),
    })
})



export const { useGetRoutinesQuery, useGetUserQuery } = fireStoreApi
