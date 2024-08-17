import { Button, Dialog, DialogTitle } from "@mui/material";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";

interface UserDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserDialog({ open, setOpen }: UserDialogProps) {

    // Will take username from the dialog and add it to the curret group that the user is in 
    const submitButton = async () => {
        const session = await getSession(); 
        const username = session?.user?.email; 
        console.log("USERNAME: " + username); 

        // First make request to get groupId from /api/get_user_groups 
        await fetch("/api/get_user_groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
        })
            .then((response) => response.json())
            .then((data) => {
                const groupIds = data.groupIds;  // array of group ids
                console.log(groupIds); // Print group ids 
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        

        // Then make request to add new user to groupId taken from the first request 

        setOpen(false); 
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add user to the room</DialogTitle>
            <Button onClick={submitButton}>Submit</Button>
        </Dialog>
    );
}