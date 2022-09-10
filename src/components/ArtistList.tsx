import { GridColDef } from "@mui/x-data-grid"
import { useGetArtistsQuery } from "../api/artistApiSlice"
import DataTable from "./Table"

function ArtistList() {
    const {data: artists}  = useGetArtistsQuery("")

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'album', headerName: 'Album' },
        { field: 'tracks', headerName: 'Tracks' }
    ]

    return (
        <DataTable rows={artists} columns={columns} />
    )
}
export default ArtistList