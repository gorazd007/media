import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

const albumsApi = createApi({
   //name can be anything we want
   reducerPath: 'albums',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3001'
   }),
   endpoints(builder) {
      return {
         removeAlbum: builder.mutation({
            invalidatesTags: (result, error, album) => {
               return [{ type: 'Album', id: album.id }]
            },
            query: (album) => {
               return {
                  url: `/albums/${album.id}`,
                  method: 'DELETE'
               }
            }
         }),
         addAlbum: builder.mutation({
            // in array is the string from fetchAlbums providesTag string
            //invalidatesTags: ['Album'],

            // in documentation 3rd is arg (user in my case), we get this from addAlbum in AlbumList.js
            invalidatesTags: (result, error, user) => {
               return [{ type: 'UsersAlbum', id: user.id }]
            },
            query: (user) => {
               return {
                  url: '/albums',
                  method: 'POST',
                  body: {
                     userId: user.id,
                     title: faker.commerce.productName()
                  }
               }
            }
         }),
         fetchAlbums: builder.query({
            // in providesTags array we can put a string whatever name 'Album'
            // is needed for make another request when add a album
            //providesTags: ['Album'], in this case we make a multiple requsts

            // providesTags: (results, error, user) => {
            //    return [{ type: 'Album', id: user.id }]
            // },
            // for better tag use
            providesTags: (result, error, user) => {
               const tags = result.map(album => {
                  return { type: 'Album', id: album.id }
               })
               tags.push({ type: 'UsersAlbum', id: user.id })
               return tags
            },
            query: (user) => {
               return {
                  url: '/albums',
                  params: {
                     userId: user.id
                  },
                  method: 'GET'
               }
            }
         })
      }
   }
})
export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi
export { albumsApi }