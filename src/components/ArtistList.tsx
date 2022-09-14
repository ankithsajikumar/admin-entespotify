import { GridColDef } from "@mui/x-data-grid"
import { useGetArtistsQuery, useAddArtistMutation, useEditArtistMutation, useDeleteArtistMutation } from "../api/artistApiSlice"
import EditableTable from "./EditableTable"
import EditableForm from "./Form"
import { TabList, TabPanel } from "./TabList"

function ArtistList() {
    const fetchArtists = useGetArtistsQuery("")
    const [addArtist] = useAddArtistMutation()
    const [editArtist] = useEditArtistMutation()
    const [deleteArtist] = useDeleteArtistMutation()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'name', headerName: 'Title', width: 220, editable: true },
        { field: 'album', headerName: 'Album', width: 220, editable: true },
        {field: 'tracks', headerName: 'Artist', width: 220 }
    ]

    const fields: any[] = [
        { fieldName: 'name', fieldLabel: 'Name' },
        { fieldName: 'album', fieldLabel: 'Album' }
    ]

    return (
        <TabList>
            <TabPanel index={0} label="List">
                <EditableTable columns={columns} editMutation={editArtist} deleteMutation={deleteArtist} fetchQuery={fetchArtists} />
            </TabPanel>
            <TabPanel index={1} label="Add Artist">
                <EditableForm fields={fields} buttonText='Submit' addMutation={addArtist} />
            </TabPanel>
        </TabList>
    )
}
export default ArtistList