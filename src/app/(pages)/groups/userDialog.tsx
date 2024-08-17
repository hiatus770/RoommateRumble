import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";

interface UserDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refreshDatabase: () => void;
}

export default function UserDialog({ open, setOpen, refreshDatabase }: UserDialogProps) {

    const [groupName, setGroupName] = React.useState<string>("room");
    const [userError, setUserError] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    React.useEffect(() => {
        setUserError(false);
    },[open]); 

    // Make a react use effect
    React.useEffect(() => {
        setUserError(false);

        const fetchGroupName = async () => {
            const session = await getSession();
            const response = await fetch("/api/get_user_groups", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: session?.user?.email }),
            });

            const data = await response.json();
            console.log("GROUP NAME: " + data.list[0].name);
            setGroupName(data.list[0].name);
        };

        fetchGroupName();
    }, []);

    // Will take username from the dialog and add it to the curret group that the user is in 
    const submitButton = async () => {
        const session = await getSession();
        const username = session?.user?.email;
        const usernameFromForm = document.getElementById("addedUser") as HTMLInputElement;
        console.log("USERNAME: " + username + " USERNAME BEING ADDED: " + usernameFromForm.value);

        // First make request to get groupId from /api/get_user_groups 
        const response = await fetch("/api/get_user_groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
        });

        const data = await response.json();
        console.log(data);

        const groupIds = data.list[0].id;  // array of group ids


        const addedResponse = await fetch("/api/get_user_groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usernameFromForm.value }),
        });

        const addedData = await addedResponse.json();

        // Check if addedData threw an error
        if (addedData.error) {
            console.log("ERROR: " + addedData.error);
            setErrorMessage("User not found.");
            setUserError(true);
            return;
        }

        console.log("DATA FROM USER TO BE ADDED: " + JSON.stringify(addedData));

        if (addedData.list.length !== 0) {
            console.log("USER IS IN GROUP");
            setUserError(true);
            setErrorMessage("User is already in group");
        } else {
            console.log("GROUP IDS " + JSON.stringify(groupIds)); // Print group ids 
            console.log("USERNAME FROM FORM: " + usernameFromForm.value);

            // Second request to add user 

            const response2 = await fetch("/api/join_group", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: usernameFromForm.value, groupId: groupIds }), // Bismallah and move on
            });
            setOpen(false);
            refreshDatabase();

        }


    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add user to {groupName}</DialogTitle>
            <TextField
                id="addedUser"
                label="Username"
                variant="outlined"
                error={userError}
                helperText={
                    userError ?
                        errorMessage :
                        ""}
            />
            <Button onClick={submitButton}>Submit</Button>
        </Dialog>
    );
}