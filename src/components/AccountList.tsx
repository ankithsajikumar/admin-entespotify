import { GridColDef } from "@mui/x-data-grid"
import { useGetAccountsQuery, useAddAccountMutation, useEditAccountMutation, useDeleteAccountMutation } from "../api/accountApiSlice"
import EditableTable from "./EditableTable"
import EditableForm from "./Form"
import { TabList, TabPanel } from "./TabList"

function AccountList() {
    const fetchAccounts  = useGetAccountsQuery("")
    const [addAccount] = useAddAccountMutation()
    const [editAccount] = useEditAccountMutation()
    const [deleteAccount] = useDeleteAccountMutation()

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
                <EditableTable columns={columns} editMutation={editAccount} deleteMutation={deleteAccount} fetchQuery={fetchAccounts} />
            </TabPanel>
            <TabPanel index={1} label="Add Track">
                <EditableForm fields={fields} buttonText='Submit' addMutation={addAccount} />
            </TabPanel>
        </TabList>
    )
}
export default AccountList