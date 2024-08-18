import { Autocomplete, Box, Button, CircularProgress, DialogActions, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";

interface AddUserProps {
    groupId: String;
}

export default function AddUser({groupId} : AddUserProps) {
    const [username, setUsername] = React.useState("");
    const [usersList, setUsersList] = React.useState<string[]>([]);
    const [pendingAdd, setPendingAdd] = React.useState(false);

    const submitButton = async () => {

        for (const user of usersList) {
            console.log("GROUP ID: " + groupId + "USERNAMES: " + JSON.stringify(usersList));
            setPendingAdd(true);
            const response = await fetch("/api/join_group", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user,
                    groupId: groupId,
                }),
            });
        }
    }

    return (   
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                },
              }}
            >
        <Typography sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            background: 'linear-gradient(0deg, #8FBCBB 40%, #5E81AC 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            fontSize: '1.5rem',
        }}>
        Add Users To Your Group
        </Typography>
        <Autocomplete
            fullWidth
            multiple
            freeSolo
            id="user autocomplete"
            options={[]}
            value={usersList}
            onChange={(event, newValue) => {
                let newUsersList = newValue;
                if (!newUsersList.includes(username)) {
                    newUsersList = [username, ...newUsersList];
                }
                const prunedUsersList = newUsersList.filter(
                    (user) => /^[0-9a-zA-Z_.-]+$/.test(user)
                ); // Filter out invalid usernames
                setUsersList(prunedUsersList);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Enter usernames here"
                    placeholder="Enter username here"
                    size="small"
                />
            )}
            sx={{ margin: 1 }}
        />

        <Button
        color="primary" 
        variant="contained"
        onClick={submitButton}
        fullWidth
        >
            Add
            </Button>

        </Box> 
    );
}