import { configureStore } from '@reduxjs/toolkit';
import { albumsApi } from './apis/albumsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './slices/usersSlice';
import { photosApi } from './apis/photosApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // this in [] takes 'albums' string from albumApi for a key. we can type like "albums:" but can make a typo 
    [albumsApi.reducerPath]: albumsApi.reducer,
    // add photo reducer
    [photosApi.reducerPath]: photosApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      // add photos middleware
      .concat(photosApi.middleware)
  }
});
setupListeners(store.dispatch)

// to test in console. in console type store.getState()
//window.store = store


export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumsApi'
export { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } from './apis/photosApi'
