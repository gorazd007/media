import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import AlbumListItem from './AlbumListItem';
import Skeleton from './Skeleton';
import Button from './Button'



function AlbumsList({ user }) {
  // destructure in object from use hook. user in useFetchAlbumsQuery is query in albumApi "query:"
  // isLoading is true only in first request, isFetching is true on every request
  const { data, error, isFetching } = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()

  // const results = useFetchAlbumsQuery(user)
  // console.log(results);

  const handleAddAlbum = () => {
    addAlbum(user)
  }

  let content
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full" />
  } else if (error) {
    content = <div>Error loading albums!</div>
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />
    })
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center m-2'>
        <h3 className='text-xl font-bold '>Albums of {user.name}</h3>
        <Button primary onClick={handleAddAlbum} loading={results.isLoading}>
          + Add Album
        </Button>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}

export default AlbumsList;
