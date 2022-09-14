import { GridColDef } from "@mui/x-data-grid"
import { useGetTracksQuery, useAddTrackMutation, useEditTrackMutation, useDeleteTrackMutation } from "../api/trackApiSlice"
import EditableTable from "./EditableTable";
import EditableForm from "./Form";
import { TabList, TabPanel } from "./TabList";

function TrackList() {
    const fetchTracks = useGetTracksQuery({ refetchOnMountOrArgChange: true })
    const [addTrack] = useAddTrackMutation()
    const [editTrack] = useEditTrackMutation()
    const [deleteTrack] = useDeleteTrackMutation()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 180 },
        { field: 'title', headerName: 'Title', width: 220, editable: true },
        { field: 'artist', headerName: 'Artist', width: 220 },
        { field: 'album', headerName: 'Album', width: 220, editable: true }
    ]

    const fields: any[] = [
        { fieldName: 'title', fieldLabel: 'Title' },
        { fieldName: 'album', fieldLabel: 'Album' }
    ]

    return (
        <TabList>
            <TabPanel index={0} label="List">
                <EditableTable columns={columns} editMutation={editTrack} deleteMutation={deleteTrack} fetchQuery={fetchTracks} />
            </TabPanel>
            <TabPanel index={1} label="Add Track">
                <EditableForm fields={fields} buttonText='Submit' addMutation={addTrack} />
            </TabPanel>
        </TabList>
    )
}
export default TrackList
