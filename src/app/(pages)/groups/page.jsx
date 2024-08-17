"use client";
import Logout from "@/app/logout";
import { getSession } from "next-auth/react";
import {
    Autocomplete,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    InputLabel,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React from "react";
import UserDialog from "./userDialog";
import GroupAddDialog from "./groupAddDialog";


export default function GroupsPage() {
    const [message, setMessage] = React.useState("");
    const [usersList, setUsersList] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    const [isInAGroup, setIsInAGroup] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openCreateGroup, setOpenCreateGroup] = React.useState(false);

    React.useEffect(() => {
        const setSessionAsync = async () => {
            const session = await getSession();
            setUsername(session?.user?.email);
        }
        setSessionAsync();
    }, []);
    // localhost:3000/user

    // Fetch users list
    async function fetchUsersList() {
        if (!username) {  // No user logged in
            return;
        }

        // Rewrite the above request as const repsonse 
        const response = await fetch("/api/get_user_groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
        });

        const data = await response.json();
        const groupList = data.list;
        groupList.map(jsonObj => {
            // console.log(jsonObj.name);
            // console.log(jsonObj.users.split(","));
            // console.log(jsonObj.id);
        });
        setUsersList(groupList);

        console.log("LENGTH " + groupList.length);
        if (groupList.length > 0) {
            setIsInAGroup(true);
        }
    }

    React.useEffect(() => {
        if (username) {
            fetchUsersList();
        }
    }, [username]);

    const addGroup = async () => {
        await fetch("/api/add_group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "second test group",
                users: "test 1, test2",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const getIdTest = async () => {
        await fetch("/api/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: "test" }),
        })
            .then((response) => response.json())
            .then((data) => {
                const groupIds = data.groupIds;  // array of group ids
                console.log(groupIds);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const addUserEvent = async () => {
        setOpen(true);
    };

    const createGroup = async () => {
        setOpenCreateGroup(true);
    }

    const leaveGroup = async () => {
        const id = usersList[0].id;
        console.log("LEAVING GROUP WITH ID: " + id + " AS USER " + username);


        await fetch("/api/leave_group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, groupId: id }),
        })
        
        setIsInAGroup(false);
        refreshDatabase();
    }

    function refreshDatabase() {
        console.log("refreshing database");
        fetchUsersList();
    }

    return (
        <>
            <Paper
                elevation={1}
                sx={{
                    borderRadius: "1.2vh",
                    bottom: "2.4vh",
                    left: "2.4vh",
                    padding: "1.2vh",
                    position: "fixed",
                    width: "calc(100vw - 4*1.2vh)",
                    zIndex: 2,
                    backgroundColor: "background.default",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            ></Paper>

            <Paper
                elevation={0}
                sx={{
                    borderRadius: "1.2vh",
                    marginLeft: "1.2vh",
                    width: "calc(100vw - 2*1.2vh)",
                    height: "calc(100vh - 1.2vh - 64px)",
                    overflow: "auto",
                    backgroundColor: "background.background",
                }}
            >
                <Paper elevation={1} sx={{
                    borderRadius: '1.2vh',
                    bottom: '2.4vh',
                    left: '2.4vh',
                    padding: '1.2vh',
                    position: 'fixed',
                    width: `calc(100vw - 2*2.4vh)`,
                    zIndex: 2,
                    backgroundColor: "background.default"
                }}>
                    {isInAGroup && (
                    <ButtonGroup variant="contained"
                        sx={{ marginRight: 2 }}
                        aria-label="contained primary button group">
                        <Button variant="contained" onClick={addUserEvent}>Add to your group</Button>
                    </ButtonGroup>
                    )}

                    {!isInAGroup && (
                        <ButtonGroup variant="contained"
                            sx={{ marginRight: 2 }}
                            aria-label="contained primary button group">
                            <Button variant="contained" onClick={createGroup}>Create Group</Button>
                        </ButtonGroup>
                    )}

                    {isInAGroup && (
                    <ButtonGroup variant="contained"
                        sx={{ marginRight: 2 }}
                        aria-label="contained primary button group">
                        <Button variant="contained" onClick={leaveGroup}>Leave Group</Button>
                    </ButtonGroup>
                    )}
                </Paper>
                <TableContainer elevation={3} component={Paper}
                    sx={{
                        borderRadius: '1.2vh',
                        bgcolor: 'background.background',
                        margin: '1.2vh',
                        width: `calc(100vw - 2*2.4vh)`,
                        marginBottom: '8.8vh'
                    }}>
                    <Table sx={{}} aria-label="simple table">
                        <TableHead sx={{ bgcolor: 'background.paper' }}>
                            <TableRow>
                                <TableCell sx={{ width: 'auto' }}>Name</TableCell>
                                <TableCell sx={{ width: 'fit-content' }}>Members</TableCell>
                                <TableCell sx={{ width: 'auto' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList && usersList.map(jsonObj => (
                                <TableRow key={jsonObj.id}>
                                    <TableCell sx={{ width: 'auto' }}>{jsonObj.name}</TableCell>

                                    <TableCell sx={{ width: 'fit-content' }}> {jsonObj.users.split(", ").map((user) => (
                                        <Typography key={user}>{user}</Typography>
                                    ))}
                                    </TableCell>
                                    <TableCell sx={{ width: 'auto' }}>{jsonObj.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <UserDialog open={open} setOpen={setOpen} refreshDatabase={refreshDatabase} /><UserDialog />
            <GroupAddDialog openCreateGroup={openCreateGroup} setOpenCreateGroup={setOpenCreateGroup} refreshDatabase={refreshDatabase} /><GroupAddDialog />
        </>
    );
}
