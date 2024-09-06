import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  const { data, isFetching, error } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton times={3} className={"h-10 w-full"} />;
  } else if (error) {
    content = <div>Error: {error.message}</div>;
  } else {
    content = data.map((album) => (
      <AlbumsListItem album={album} key={album.id} />
    ));
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          Add album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
