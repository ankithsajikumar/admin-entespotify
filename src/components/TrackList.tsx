import { GridColDef } from "@mui/x-data-grid"
import { useGetTracksQuery } from "../api/trackApiSlice"
import EditableTable from "./EditableTable";
import DataTable from "./Table";

function TrackList() {
    const { data: tracks } = useGetTracksQuery({ refetchOnMountOrArgChange: true })

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'title', headerName: 'Title' },
        { field: 'artist', headerName: 'Artist' },
        { field: 'album', headerName: 'Album' }
    ]

    return (
        // <DataTable rows={tracks} columns={columns} />
        <EditableTable rows={tracks} />
    )
}
export default TrackList
