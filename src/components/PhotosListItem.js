import { useRemovePhotoMutation } from '../store'
import { GoTrash } from 'react-icons/go'

export default function PhotosListItem({ photo }) {

   const [removePhoto, results] = useRemovePhotoMutation()

   const handleRemovePhoto = () => {
      removePhoto(photo)
   }

   return (
      <div className="relative m-2 cursor-pointer" loading={results.isLoading} onClick={handleRemovePhoto}>
         <img className="h-20 w-20" src={photo.url} alt="album-photo" />
         <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0  hover:opacity-80'>
            <GoTrash className='text-5xl' />
         </div>
      </div>

   )
}