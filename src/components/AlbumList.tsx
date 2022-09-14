import { GridColDef } from "@mui/x-data-grid"
import { useGetAlbumsQuery, useAddAlbumMutation, useEditAlbumMutation, useDeleteAlbumMutation } from "../api/albumApiSlice"
import EditableTable from "./EditableTable"
import EditableForm from "./Form"
import { TabList, TabPanel } from "./TabList"

function AlbumList() {
    const fetchAlbums  = useGetAlbumsQuery("")
    const [addAlbum] = useAddAlbumMutation()
    const [editAlbum] = useEditAlbumMutation()
    const [deleteAlbum] = useDeleteAlbumMutation()


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'title', headerName: 'Title', width: 220, editable: true },
        { field: 'artist', headerName: 'Artist', width: 220 },
    ]

    const fields: any[] = [
        { fieldName: 'title', fieldLabel: 'Title' },
        { fieldName: 'artist', fieldLabel: 'Artist' }
    ]

    return (
        <TabList>
            <TabPanel index={0} label="List">
                <EditableTable columns={columns} editMutation={editAlbum} deleteMutation={deleteAlbum} fetchQuery={fetchAlbums} />
            </TabPanel>
            <TabPanel index={1} label="Add Album">
                <EditableForm fields={fields} buttonText='Submit' addMutation={addAlbum} />
            </TabPanel>
        </TabList>
    )
}
export default AlbumList