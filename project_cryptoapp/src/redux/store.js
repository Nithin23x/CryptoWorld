import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./slices/cryptoAPI";
import { cryptoNewsApi } from "./slices/cryptoNewsAPI";


export const store =  configureStore({
    reducer :{
        [cryptoApi.reducerPath] : cryptoApi.reducer ,
        [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer
        
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat([cryptoApi.middleware, cryptoNewsApi.middleware]),  
    
    
})