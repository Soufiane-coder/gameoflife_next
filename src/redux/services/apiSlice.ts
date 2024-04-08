
import { createApi, fakeBaseQuery, } from '@reduxjs/toolkit/query/react';
import { Timestamp } from 'firebase/firestore';


export const fireStoreApi = createApi({
    reducerPath: 'firestoreApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getUser: builder.query<any, any>({
            queryFn: async ({user}) => {
                if (!user) return {data : {}}
                const res = await fetch(`/api/auth/user?uid=${user.id}`)
                const data = await res.json()
                return {data}
            }
        }),
        getRoutines: builder.query<Array<any>, {uid: string | undefined, lastVisit: Timestamp}>({
            queryFn: async ({uid, lastVisit}) => {
                if (!uid) return {data : []}
                const res = await fetch(`/api/firebase/routines`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        uid,
                        lastVisit,
                    }),
                })
                const data = await res.json()
                return {data}
            },
        }),
    })
})

export const { useGetRoutinesQuery, useGetUserQuery} = fireStoreApi
