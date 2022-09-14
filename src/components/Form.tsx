import React from 'react';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Alert, AlertProps, Button, Select, Snackbar } from '@mui/material';
import { MutationDefinition } from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

interface fields {
    fieldName: string,
    fieldLabel: string,
    fieldType?: string
}

interface EditableFormProps {
    fields: fields[],
    buttonText?: string,
    addMutation: MutationTrigger<MutationDefinition<any, any, never, any, any>>
}

export default function EditableForm(props: EditableFormProps) {
    const { fields, buttonText, addMutation } = props
    const [formValues, setFormValues] = React.useState({})
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value })
    }

    const handleCloseSnackbar = () => setSnackbar(null);
    
    const handleSubmit = async () => {
        try {
            await addMutation(formValues)
            setSnackbar({ children: "Success", severity: 'success' })
        } catch (error) {
            console.log(error)
            setSnackbar({ children: error+ ": error occured", severity: 'error' })
        }

    }

    const inputField = fields.map(field => {
        if (field.fieldType === "select") {
            return (
                <Select
                    key={field.fieldName}
                    id={field.fieldName}
                    label={field.fieldLabel}
                    size="small"
                    sx={{ m: 1, width: '50ch' }}
                    value=""
                />
            )
        }

        return [
            <TextField
                required
                key={field.fieldName}
                size="small"
                id={field.fieldName}
                label={field.fieldLabel}
                onChange={handleChange(field.fieldName)}
            />
        ]
    })
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
        >
            <div>
                {inputField}
            </div>
            <div>
                <Button
                    variant="contained"
                    color="success"
                    sx={{m:1}}
                    onClick={handleSubmit}
                >
                    {buttonText}
                </Button>
            </div>
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
