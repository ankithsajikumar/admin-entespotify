import { GridColDef } from "@mui/x-data-grid"
import { useGetAccountsQuery } from "../api/accountApiSlice"
import DataTable from "./Table"

function AccountList() {
    const {data: accounts}  = useGetAccountsQuery("")

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'title', headerName: 'Title' },
        { field: 'artist', headerName: 'Artist' },
        { field: 'album', headerName: 'Album' }
    ]

    return (
        <DataTable rows={accounts} columns={columns} />
    )
}
export default AccountList