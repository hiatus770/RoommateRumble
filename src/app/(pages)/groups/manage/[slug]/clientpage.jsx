"use client";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CustomChip } from "./CustomChip";
import { Button, ButtonGroup, Grid, Paper, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab, InputLabel,
    Select
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Leaderboard from './leaderboard';
import AddUser from './adduser';
import AddChoreDialog from './AddChoreDialog';


const ClientPage = ({ groupId }) => {
    const sideBarWidth = 160;  // Width of the sidebar in pixels
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [choreArr, setChoreArr] = useState(null);
    const [sortMethod, setSortMethod] = useState("name");
    const [open, setOpen] = React.useState(false);  // Is dialogue open
    const [pendingAdd, setPendingAdd] = useState(false);

    const handleTabChange = (event, newValue) => {
        setCurrentTabIndex(newValue);
    };

    const [deleting, setDeleting] = useState(0);
    const startDeleting = () => {
        setDeleting(1);
    }
    const stopDeleting = () => {
        setDeleting(0);
    }

    const openAddChore = () => {  // Open an add chore dialog
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const resetGroup = () => {
        fetch("/api/reset_group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: groupId }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("Data: ", data);
            fetchChores();
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    const deleteChore = (id) => {
        console.log("Delete Chore: ", id);
        /*
        // Receives a group id and chore object
export async function POST(request: Request) {
    try { 
        const { groupId, choreId } = await request.json();
        */

        fetch("/api/delete_chore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ groupId: groupId, choreId: id }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("Data: ", data);
            fetchChores();
        }).catch((error) => {
            console.error("Error:", error);
        }).finally(() => {
            setDeleting(0);
        });
    }

    const startChore = (choreObj) => {
        console.log("Start Chore: ", choreObj.id);
        // Update chore status to "In Progress"
        /*
        // localhost:3000/api/update_chore

// Receives a group id and chore object
export async function POST(request: Request) {
    try { 
        const { id, choreObj } = await request.json();
        */

        choreObj.status = "In Progress";
        fetch("/api/update_chore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: groupId, choreObj: choreObj }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("Data: ", data);
            fetchChores();
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    const completeChore = (choreObj) => {
        // we have group id (groupId)
        // get username

        getSession().then((session) => {
            const username = session?.user?.email;

            console.log("Complete Chore: ", choreObj.id);
            // Update chore status to "Complete"
            choreObj.status = "Complete";
            fetch("/api/update_chore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: groupId, choreObj: choreObj }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log("Data: ", data);
                fetchChores();
            }).catch((error) => {
                console.error("Error:", error);
            });

            // Update user points maybe .then easier

            fetch('/api/get_scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupId: groupId,
                })
            }).then((response) => {
                return response.json();
            }).then((data) => {

                const scores = JSON.parse(data.scores);
                // Find the user in the scores json object
                for (let i = 0; i < scores.length; i++) {
                    if (scores[i].username === username) {
                        scores[i].points += choreObj.points;
                        break;
                    }
                }

                fetch('/api/set_scores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        groupId: groupId,
                        scores: JSON.stringify(scores),
                    })
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log('updated score data for group id:', groupId);
                }).catch((error) => {
                    console.error('Update score error :', error);
                });
            }).catch((error) => {
                console.error('Error:', error);
            });
        });

    }

    const handleSubmit = () => {
        const groupName = document.getElementById("choreName").value;
        console.log("Group Name: ", groupName);
        const groupDescription = document.getElementById("choreDescription").value;
        console.log("Group Description: ", groupDescription);
        const groupPoints = document.getElementById("chorePoints").value;
        console.log("Group Points: ", groupPoints);
        //        const response = await sql`INSERT INTO table_${id} (name, description, date, status, points, image) VALUES (${choreObj.name}, ${choreObj.description}, ${dateUnix}, ${choreObj.status}, ${choreObj.points}, ${choreObj.image})`;
        /*
        
// localhost:3000/api/add_chore

// Receives a group id and chore object
export async function POST(request: Request){
    try { 
        const { id, choreObj } = await request.json();
        */

        const newChore = {
            name: groupName,
            description: groupDescription,
            points: groupPoints,
            image: "nothing yet",
            status: "Incomplete"
        };

        fetch("/api/add_chore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: groupId, choreObj: newChore }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("Data: ", data);
            fetchChores();
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    /*
    
// localhost:3000/api/get_chores

// fetches a list of chores given a group id
export async function POST(request: Request) {
    const { id } = await request.json();  // Get group id
    */

    function fetchChores() {
        fetch("/api/get_chores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: groupId }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            var choreList = data.list;
            console.log("Chore List: ", choreList);
            setChoreArr(choreList);
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    React.useEffect(() => {
        fetchChores();
    }, []);

    return (
        <>
            <Grid container alignItems="stretch" sx={{ flexGrow: 1, display: "flex" }}>
                <Grid item sx={{ width: `${sideBarWidth}px`, height: "100%" }}>
                    <Tabs
                        value={currentTabIndex}
                        onChange={handleTabChange}
                        sx={{
                            marginTop: "10px",
                            backgroundColor: "background.default",
                            height: "calc(100vh - 10px - 64px)",
                            '.MuiTabs-indicator': {
                                left: 0,
                                width: "5px",
                                borderRadius: '0 1.2vh 1.2vh 0',
                            }
                        }}
                        orientation="vertical"
                    >
                        <Tab icon={<VisibilityIcon />} iconPosition="start" label="Chores"
                            sx={{ fontWeight: "bold", fontSize: 13 }} />
                        <Tab icon={<BarChartIcon />} iconPosition="start" label="Leaderboard"
                            sx={{ fontWeight: "bold", fontSize: 13 }} />
                        <Tab icon={<PersonAddIcon />} iconPosition="start" label="Add Users"
                            sx={{ fontWeight: "bold", fontSize: 13 }} />
                    </Tabs>
                </Grid>
                <Grid item sx={{ width: `calc(100vw - 1.2vh - ${sideBarWidth}px)`, height: "100%" }}>
                    <Paper elevation={0} sx={{ borderRadius: '1.2vh', height: 'calc(100vh - 1.2vh - 64px)', overflow: 'auto', backgroundColor: "background.background" }}>
                        {currentTabIndex === 0 && (
                            choreArr === null ? (
                                <LinearProgress />
                            ) : (
                                <Box sx={{ display: 'flex', mb: 'calc(64px)' }}>
                                    <Grid container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                        spacing="1.2vh"
                                        m="1.2vh"
                                        ml="0.6vh"
                                        mt="0.6vh"
                                    >
                                        <AddChoreDialog
                                            open={open}
                                            handleClose={handleClose}
                                            handleSubmit={handleSubmit}
                                            pendingAdd={pendingAdd}
                                        />
                                        <Paper elevation={1} sx={{ borderRadius: '1.2vh', bottom: '2.4vh', left: `calc(${sideBarWidth}px + 1.2vh)`, padding: '1.2vh', position: 'fixed', width: `calc(100vw - ${sideBarWidth}px - 3*1.2vh)`, zIndex: 2, backgroundColor: "background.default", display: 'flex', justifyContent: 'space-between' }}>
                                            {
                                                (
                                                    deleting === 0 ? (
                                                        <ButtonGroup color="primary" variant="contained" position="fixed">
                                                            <Button onClick={openAddChore} startIcon={<AddIcon />}>
                                                                Add
                                                            </Button>
                                                            <Button onClick={startDeleting} startIcon={<DeleteIcon />}>
                                                                Delete
                                                            </Button>
                                                            <Button onClick={resetGroup} startIcon={<DeleteIcon />}>t
                                                                Reset Group
                                                            </Button>
                                                        </ButtonGroup>
                                                    ) : (
                                                        <Button onClick={stopDeleting} startIcon={<CancelIcon />}
                                                            variant="contained">
                                                            Cancel
                                                        </Button>
                                                    ))
                                            }

                                            <FormControl sx={{ minWidth: "10%" }}>
                                                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                                                <Select
                                                    size="small"
                                                    sx={{ marginBottom: -1 }}
                                                    labelId="sort-select"
                                                    id="sort-select"
                                                    value={sortMethod}
                                                    label="Sort By"
                                                    onChange={(event) => {
                                                        setSortMethod(event.target.value)

                                                        const newArr = choreArr.slice();
                                                        newArr.sort((a, b) => {
                                                            return a[event.target.value] > b[event.target.value] ? 1 : -1;
                                                        });

                                                        if (event.target.value === "date") {
                                                            // reverse
                                                            newArr.reverse();
                                                        }

                                                        setChoreArr(newArr);
                                                    }}
                                                >
                                                    <MenuItem value="name">Name</MenuItem>
                                                    <MenuItem value="date">Date Added</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Paper>

                                        {choreArr.length === 0 ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                                            <Typography sx={{
                                                background: 'linear-gradient(0deg, #8FBCBB 40%, #5E81AC 90%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                fontWeight: 'bold',
                                                fontSize: '1.5rem'
                                            }}>
                                                Add chores to get started!
                                            </Typography>
                                        </Box>
                                        ) : (
                                        choreArr.map((chore) => (
                                            <Grid item key={chore.id} xs={12} sm={6} md={4} lg={3} sx={{ padding: "0.6vh" }}>
                                                <Card
                                                    elevation={2}
                                                    sx={{
                                                        height: "calc(50vh - 3*1.2vh - 64px)",
                                                        minHeight: "350px",
                                                        borderRadius: "1.2vh",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        sx={{
                                                            maxWidth: "100%",
                                                            height: "50%", // set a fixed height for the card image and description typography
                                                            objectFit: "cover",
                                                            pointerEvents: 'none'
                                                        }}
                                                        image={chore.image}
                                                        alt={`${chore.name} Profile Image`}
                                                    />
                                                    <CardContent sx={{ height: "39%", overflow: "hidden", paddingTop: "2%" }}>
                                                        <Typography variant="h5" component="div">
                                                            {chore.name}
                                                        </Typography>
                                                        <Typography sx={{ paddingTop: "1%", paddingBottom: "2%" }}>
                                                            <CustomChip label={chore.status} size="small" />
                                                            <CustomChip label={`${chore.points} points`} size="small" />
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary"
                                                            sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                                                            {chore.description}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions sx={{ padding: "2%" }}>
                                                        {chore.status === "Incomplete" ? (
                                                            <Button size="small" sx={{ fontWeight: "bold" }} onClick={() => startChore(chore)}>
                                                                Start
                                                            </Button>
                                                        ) : (

                                                            chore.status === "In Progress" ? (
                                                                <Button size="small" sx={{ fontWeight: "bold" }} onClick={() => completeChore(chore)}>
                                                                    Mark as complete
                                                                </Button>
                                                            ) : (
                                                                <Button size="small" sx={{ fontWeight: "bold" }} disabled>
                                                                    Completed
                                                                </Button>
                                                            )

                                                        )}
                                                        {

                                                            deleting === 1 &&
                                                            <Button onClick={() => deleteChore(chore.id)} color="error" size="small" sx={{ fontWeight: "bold" }}>
                                                                Delete
                                                            </Button>
                                                        }

                                                    </CardActions>

                                                </Card>
                                            </Grid>
                                        ))
                                        )}
                                    </Grid>
                                </Box>
                            )

                        )}

                        {currentTabIndex === 1 && (
                            <Box margin="1.2vh"> <Leaderboard groupId={groupId} /> </Box>
                        )}

                        {currentTabIndex === 2 &&
                            <Box margin="1.2vh"> <AddUser groupId={groupId} /> </Box>

                        }
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};


export default ClientPage;