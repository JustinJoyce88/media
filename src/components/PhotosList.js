import React from "react";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from "./PhotosListItem";

export default function PhotosList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    content = <Skeleton times={4} className={"h-8 w-8"} />;
  } else if (error) {
    content = <div>Error: {error.message}</div>;
  } else {
    content = data.map((photo) => (
      <PhotosListItem photo={photo} key={photo.id} />
    ));
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          + Add photo
        </Button>
      </div>
      <div className="flex flex-row flex-wrap mx-8 justify-center">
        {content}
      </div>
    </div>
  );
}
