import { GridColDef } from "@mui/x-data-grid"
import { useGetAlbumsQuery } from "../api/albumApiSlice"
import DataTable from "./Table"

function AlbumList() {
    const {data: albums}  = useGetAlbumsQuery("")

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'title', headerName: 'Title' },
        { field: 'artist', headerName: 'Artist' }
    ]

    return (
        <DataTable rows={albums} columns={columns} />
    )
}
export default AlbumList