// apiSlice.js
import { getRoutinesFromFirebase } from '@/lib/firebase/routine.apis';
import { getUserData } from '@/lib/firebase/user.apis';
import { UserType } from '@/types/user.type';
import { createApi, fakeBaseQuery, } from '@reduxjs/toolkit/query/react';
import { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { setRoutines } from '../features/routinesSlice';
// import { db } from '@/lib/firebase/firebaseConfig'; // Import db object

// const initial

export const fireStoreApi = createApi({
    reducerPath: 'firestoreApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getUser: builder.query<any, any>({
            queryFn: async ({user}) => {
                if (!user) return {data : {}}
                const data = await getUserData(user)
                return {data}
            }
        }),
        getRoutines: builder.query<Array<any>, {uid: string | undefined}>({
            queryFn: async ({uid}) => {
                if (!uid) return {data : []}
                const routines = await getRoutinesFromFirebase(uid)
                return {data: routines}
            },
        }),
    })
})

export const { useGetRoutinesQuery, useGetUserQuery } = fireStoreApi
