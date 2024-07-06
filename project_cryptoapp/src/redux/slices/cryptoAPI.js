import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://coinranking1.p.rapidapi.com",
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', "fbe014047fmsh5fecb8c1f3e9c0bp163808jsn86872ae7e609")
            // headers.set('x-rapidapi-host','coinranking1.p.rapidapi.com')

            return headers
        }
    }),

    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) =>  `/coins?limit=${count}` 
        }),
        getCryptoDetails:builder.query ({
            query : (coinId) => `/coin/${coinId}` 
        }),
        getCoinHistory : builder.query ({
            query :({coinId,timeHistory}) => `/coin/${coinId}/history?timePeriod=${timeHistory}`
        })
    })
})

export const { useGetCryptosQuery ,useGetCryptoDetailsQuery, useGetCoinHistoryQuery} = cryptoApi 
