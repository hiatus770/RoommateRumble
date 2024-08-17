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
    LinearProgress,
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import {useRouter} from 'next/navigation'

export default function GroupsPage() {
    const [message, setMessage] = React.useState("");
    const [usersList, setUsersList] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const router = useRouter();
    const [isInAGroup, setIsInAGroup] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openCreateGroup, setOpenCreateGroup] = React.useState(false);
    const [isLeaving, setIsLeaving] = React.useState(false);

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
        if (!username) {  // No user logged in
            return;
        }
        fetchUsersList();
    }, [username]);

    const addGroup = () => {
        fetch("/api/add_group", {
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

    const getIdTest = () => {
        fetch("/api/groups", {
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

    const addUserEvent = () => {
        setOpen(true);
    };

    const createGroup = () => {
        setOpenCreateGroup(true);
    }

    const leaveGroup = (id) => {
        console.log("LEAVING GROUP WITH ID: " + id + " AS USER " + username);
        fetch("/api/leave_group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, groupId: id }),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                refreshDatabase();  // Refresh the database
            })
            .catch((error) => {
                console.error("Error:", error);
            }).then(() => {
                setIsLeaving(false); // Remove all leaving buttons
            });
    }

    function refreshDatabase() {
        console.log("refreshing database");
        fetchUsersList();
    }

    function openGroupPage(id) {
        console.log("OPENING PAGE:", id);

        router.push(`/groups/manage/${id}`);
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
            >
                {
                    <ButtonGroup variant="contained"
                        aria-label="contained primary button group">
                        <Button variant="contained" onClick={createGroup}>Create Group</Button>
                        {
                            isLeaving ? (
                                <Button onClick={()=>{setIsLeaving(false)}} startIcon={<CancelIcon/>}
                                        variant="contained">
                                    Cancel
                                </Button>
                            ) : (
                                <Button variant = "contained" onClick = {()=>{setIsLeaving(true)}}>Leave a group</Button>
                            )   
                        }
                        </ButtonGroup>
                    }
            </Paper>

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
                {
                    (usersList === null) ? <LinearProgress /> : (
                    <TableContainer elevation={3} component={Paper}
                        sx={{
                            borderRadius: '1.2vh',
                            bgcolor: 'background.background',
                            margin: '1.2vh',
                            width: `calc(100vw - 2*2.4vh)`,
                            marginBottom: '8.8vh'
                        }}>
                        <Table stickyHeader sx={{}} aria-label="simple table">
                            <TableHead sx={{ bgcolor: 'background.paper' }}>
                                <TableRow>
                                    <TableCell sx={{ width: 'auto' }}>Name</TableCell>
                                    <TableCell sx={{ width: 'fit-content' }}>Members</TableCell>
                                    <TableCell sx={ {width: 'auto' }}></TableCell>
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
                                        <TableCell sx={{ width: 'auto', display: 'flex', justifyContent: "flex-end" }}>
                                            {isLeaving ? (
                                                    <Button color="error" variant="outlined" sx={{fontWeight: "medium"}} onClick={() => leaveGroup(jsonObj.id)}>Leave</Button>
                                                ) : (  
                                                    <Button onClick={()=> openGroupPage(jsonObj.id)}>View</Button>
                                                )
                                            } 
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    )
                }
            </Paper>

            <GroupAddDialog openCreateGroup={openCreateGroup} setOpenCreateGroup={setOpenCreateGroup} refreshDatabase={refreshDatabase} /><GroupAddDialog />
        </>
    );
}
