import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress, Typography } from '@mui/material';
import Resizer from "react-image-file-resizer";

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
    };

    return (<Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle align="center" variant="h5" sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                background: 'linear-gradient(0deg, #8FBCBB 40%, #5E81AC 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
            }}>Add Chore</DialogTitle>
        <DialogContent>
            <DialogContentText sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold'
            }}>
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
            <Typography sx={{
                mt: 2.5,
                mb: 1,
                fontSize: 16,
                fontWeight: "bold"
            }}
            >
                Upload A Photo of the Chore
            </Typography>
            <input type="file" onChange={handleFileChange}/>
        </DialogContent>
        {pendingAdd ? (
            <DialogActions>
                <Button type="submit" disabled>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} /> Adding Chore
                </Button>
            </DialogActions>
        ) : (
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">Cancel</Button>
                <Button onClick={() => handleSubmit(selectedFile) } color="primary" variant="contained">Add Chore</Button>
            </DialogActions>
        )}
    </Dialog> );
}

export default AddChoreDialog;