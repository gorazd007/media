import Button from "./Button"
import ExpandablePanel from "./ExpandablePanel"
import { GoTrash } from "react-icons/go"
import { useRemoveAlbumMutation } from "../store"
import PhotosList from "./PhotosList"


export default function AlbumListItem({ album }) {

   const [removeAlbum, results] = useRemoveAlbumMutation()

   const handleRemoveAlbum = () => {
      removeAlbum(album)
   }

   const header = <>
      <Button
         className="mr-2"
         loading={results.isLoading}
         onClick={handleRemoveAlbum}>
         <GoTrash />
      </Button>
      <div>{album.title}</div>
   </>


   return (
      <ExpandablePanel header={header}>
         <div>
            <PhotosList album={album} />
         </div>

      </ExpandablePanel>
   )
}