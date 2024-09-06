import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    fetchPhotos: builder.query({
      providesTags: (result, error, album) => {
        const tags = result.map((photo) => ({ type: "Photo", id: photo.id }));
        tags.push({ type: "Album", id: album.id });
        return tags;
      },
      query: (album) => {
        return {
          url: `/photos`,
          method: "GET",
          params: {
            albumId: album.id,
          },
        };
      },
    }),
    addPhoto: builder.mutation({
      invalidatesTags: (result, error, album) => {
        return [{ type: "Album", id: album.id }];
      },
      query: (album) => {
        return {
          url: `/photos`,
          method: "POST",
          body: {
            albumId: album.id,
            url: faker.image.abstract(150, 150, true),
          },
        };
      },
    }),
    removePhoto: builder.mutation({
      invalidatesTags: (result, error, photo) => {
        return [{ type: "Photo", id: photo.id }];
      },
      query: (photo) => {
        return {
          url: `/photos/${photo.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export default photosApi;
