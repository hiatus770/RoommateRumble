import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";

interface GroupDialogProps {
    openCreateGroup: boolean;
    setOpenCreateGroup: React.Dispatch<React.SetStateAction<boolean>>;
    refreshDatabase: () => void;
}

export default function GroupAddDialog({ openCreateGroup, setOpenCreateGroup, refreshDatabase }: GroupDialogProps) {

    const [userError, setUserError] = React.useState(false); 
    const [errorMessage, setErrorMessage] = React.useState("");
    
    const submitButton = async () => {
        const groupName = (document.getElementById('groupName') as HTMLInputElement).value;
        if (groupName === "") {
            setUserError(true);
            setErrorMessage("Group name cannot be empty");
            return;
        }
    
        
        const session = await getSession(); 
        const username = session?.user?.email; 

        console.log("Usernme is " + username);

        const response = await fetch("/api/add_group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: groupName, users: username }),
        });

        const data = await response.json();
        

        if (!response.ok) {
            setUserError(true);
            setErrorMessage("Group name already exists");
            return;
        }

        
        setUserError(false);
        setOpenCreateGroup(false);
        refreshDatabase();
    }

    return (
        <Dialog open={openCreateGroup} onClose={() => setOpenCreateGroup(false)}>
            <DialogTitle>Create a Group</DialogTitle>
            <TextField
                id="groupName"
                label="Group Name"
                variant="outlined"
                error={userError}

            />
            <Button onClick={submitButton}>Submit</Button>
        </Dialog>
    );
}