import { DataGrid, GridColDef } from '@mui/x-data-grid'
interface TableProps {
    rows: readonly[],
    columns:  GridColDef[]
}
const blank : TableProps = {
    rows: [],
    columns: []
}

export default function DataTable(props: TableProps) {
    const {rows, columns} = props
    const {rows:blankRows, columns: blankColumns} = blank

  return (
    <div style={{ height: 569, width: '100%' }}>
      <DataGrid
        rows={rows? rows : blankRows}
        columns={columns? columns : blankColumns}
      />
    </div>
  )
}
