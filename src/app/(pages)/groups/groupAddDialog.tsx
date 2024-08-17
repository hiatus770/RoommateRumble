import {
    Autocomplete,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    LinearProgress,
    TextField,
    Typography,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";

interface GroupDialogProps {
    openCreateGroup: boolean;
    setOpenCreateGroup: React.Dispatch<React.SetStateAction<boolean>>;
    refreshDatabase: () => void;
}

export default function GroupAddDialog({
    openCreateGroup,
    setOpenCreateGroup,
    refreshDatabase,
}: GroupDialogProps) {
    const [userError, setUserError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [usersList, setUsersList] = React.useState<string[]>([]);
    const [pendingAdd, setPendingAdd] = React.useState(false);

    React.useEffect(() => {
        getSession().then((session) => {
            setUsername(session?.user?.email ?? "");
        });
    }, []);

    React.useEffect(() => {
        const newUsersList = []; // Create a new list of users
        newUsersList.push(username);
        setUsersList(newUsersList); // Reset the users list
    }, [username]);

    // TODO: check for name validity
    const submitButton = async () => {
        const groupName = (
            document.getElementById("groupName") as HTMLInputElement
        ).value;

        if (groupName === "") {
            setUserError(true);
            setErrorMessage("Group name cannot be empty");
            return;
        }
        
        setPendingAdd(true);
        const response = await fetch("/api/add_group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: groupName,
                users: usersList.join(","),
            }),
        });

        if (!response.ok) {
            setUserError(true);
            setErrorMessage("Group name already exists");
            return;
        }

        setUserError(false);
        setOpenCreateGroup(false);
        refreshDatabase();
        setPendingAdd(false);
    };

    return (
        <Dialog
            open={openCreateGroup}
            onClose={() => setOpenCreateGroup(false)}
            fullWidth
        >
            <DialogTitle>Create a Group</DialogTitle>
            <DialogContent>
                {username === "" ? (
                    <LinearProgress />
                ) : (
                        <Grid
                            container
                            direction="column"
                            paddingRight={2}
                        >
                            <TextField
                            id="groupName"
                            label="Group Name"
                                variant="outlined"
                                error={userError}
                                sx={{ margin: 1, width: "100%"}}
                        />
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
                                    label="Group usernames"
                                    placeholder="Enter usernames"
                                    size="small"
                                />
                                )}
                                sx={{margin: 1}}
                        />
                    </Grid>
                )}
            </DialogContent>

            {pendingAdd ? (
                                <DialogActions>

                    <Button type="submit" disabled>
                                    <CircularProgress size={24} color="inherit" sx={{mr: 1}}/> Creating
                    </Button>
                    </DialogActions>

            ) : (
                <DialogActions>

                    <Button onClick={submitButton}>Create</Button>
                        <Button onClick={() => setOpenCreateGroup(false)}>Cancel</Button>
                    </DialogActions>
                    )}
        </Dialog>
    );
}
