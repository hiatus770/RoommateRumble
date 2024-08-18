import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress } from '@mui/material';

const AddChoreDialog = ({ open, handleClose, handleSubmit, pendingAdd }) => {
    const [selectedFile, setSelectedFile] = React.useState(null);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                400,
                400,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });
    const handleFileChange = async (e) => {
        const file = await resizeFile(e.target.files[0]);
        setSelectedFile(file);
        setIsEdited(true);  // Submit button should be enabled
        // close dialog
        handleClose();
    };

    return (<Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Chore</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter the details of the new chore.
            </DialogContentText>
            <TextField
                fullWidth
                margin="dense"
                id="choreName"
                label="Name"
                variant="standard"
            />
            <TextField
                fullWidth
                margin="dense"
                id="choreDescription"
                label="Description"
                variant="standard"
            />
            <TextField
                fullWidth
                margin="dense"
                id="chorePoints"
                label="Points"
                variant="standard"
            />
            <input type="file" onChange={handleFileChange} />
        </DialogContent>
        {pendingAdd ? (
            <DialogActions>
                <Button type="submit" disabled>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} /> Adding Chore
                </Button>
            </DialogActions>
        ) : (
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSubmit()}>Add Chore</Button>
            </DialogActions>
        )}
    </Dialog> );
}

export default AddChoreDialog;