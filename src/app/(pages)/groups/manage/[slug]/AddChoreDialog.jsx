import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress } from '@mui/material';

const AddChoreDialog = ({ open, handleClose, handleSubmit, pendingAdd }) => (
    <Dialog open={open} onClose={handleClose} fullWidth>
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
        </DialogContent>
        {pendingAdd ? (
            <DialogActions>
                <Button type="submit" disabled>
                    <CircularProgress size={24} color="inherit" sx={{mr: 1}}/> Adding Chore
                </Button>
            </DialogActions>
        ) : (
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleSubmit()}>Add Chore</Button>
            </DialogActions>
        )}
    </Dialog>
);

export default AddChoreDialog;