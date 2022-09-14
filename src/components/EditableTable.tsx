import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColumns,
    GridRowParams,
    MuiEvent,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridColDef,
} from '@mui/x-data-grid';
import { MutationDefinition, QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { MutationTrigger, UseQueryHookResult } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Typography } from '@mui/material';

interface TableProps {
    columns: GridColDef[],
    editMutation: MutationTrigger<MutationDefinition<any, any, never, any, any>>,
    deleteMutation: MutationTrigger<MutationDefinition<any, any, never, any, any>>,
    fetchQuery: UseQueryHookResult<QueryDefinition<any, any, never, any, "api">>
}

export default function EditableTable(props: TableProps) {

    const { columns: compColumn, editMutation, deleteMutation, fetchQuery } = props;
    const { data, isLoading, refetch } = fetchQuery;
    const initialRows: GridRowsProp = [];
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

    const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    }

    const handleDeleteClick = (id: GridRowId) => async () => {
        const index = rows.indexOf(rows.filter(row => row.id === id)[0]);
        setRows(rows.filter((row) => row.id !== id));
        try {
            await deleteMutation(rows[index].id)
        } catch (error) {
            setSnackbar({ children: 'Row delete unsuccessfull: ' + error, severity: 'error' });
        }
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {
            const updatedRow = { ...newRow };
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            try {
                compColumn.map(column => {
                    if (!column.editable && column.field != 'id') {
                        if (newRow.hasOwnProperty(column.field)) {
                            newRow[column.field] = null
                        }
                    }
                });
                await editMutation(newRow);
                setSnackbar({ children: 'Row updated successfully', severity: 'success' });
            } catch (error) {
                setSnackbar({ children: 'Row update unsuccessfull: ' + error, severity: 'error' });
            }
            return updatedRow;
        }, [editMutation]
    );

    React.useEffect(() => {
        refetch()
    }, [])

    React.useEffect(() => {
        setRows(data)
    }, [data])

    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
        setSnackbar({ children: error.message, severity: 'error' })
    }, []);

    const handleCloseSnackbar = () => setSnackbar(null);

    const columns: GridColumns = [
        ...compColumn,
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />
                    ]
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ]
            }
        }
    ]

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            {isLoading ? <Typography>Loading</Typography> :
                <DataGrid
                    rows={rows ? rows : []}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    experimentalFeatures={{ newEditingApi: true }}
                />}
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </Box>
    )
}
