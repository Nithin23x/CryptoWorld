
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const cryptoNewsApi = createApi({
    reducerPath:"cryptoNewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl : "https://real-time-news-data.p.rapidapi.com",
        prepareHeaders :(headers) =>{
            headers.set('x-rapidapi-key', 'fbe014047fmsh5fecb8c1f3e9c0bp163808jsn86872ae7e609')
            headers.set('x-rapidapi-host', 'real-time-news-data.p.rapidapi.com') 

            return headers 
        }

    }),

    endpoints : (builder) => ({
        getNews : builder.query({
            query :(count) => `search?query=Cryptocurrency&limit=${count}&time_published=anytime&country=US&lang=en`
        })
    })
})

export const {useGetNewsQuery} = cryptoNewsApi 


