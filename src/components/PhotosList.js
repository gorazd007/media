import { useFetchPhotosQuery, useAddPhotoMutation } from "../store"
import Button from './Button'
import Skeleton from './Skeleton'
import PhotosListItem from "./PhotosListItem"

export default function PhotosList({ album }) {
   const { data, error, isFetching } = useFetchPhotosQuery(album)
   const [addPhoto, addPhotoResults] = useAddPhotoMutation()

   const handleAddPhoto = () => {
      addPhoto(album)
   }

   let content

   if (isFetching) {
      content = <Skeleton times={4} className="h-20 w-20 mr-3" />
   } else if (error) {
      content = <div>Error loading photos...</div>
   } else {
      content = data.map((photo) => {
         return <PhotosListItem key={photo.id} photo={photo} />
      })
   }

   return (
      <div>
         <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Photos in {album.title}</h3>
            <Button
               primary
               loading={addPhotoResults.isLoading}
               onClick={handleAddPhoto}
            >
               + Add Photo
            </Button>
         </div>
         <div className="mx-8 flex flex-row flex-wrap justify-center">
            {content}
         </div>
      </div>
   )
}