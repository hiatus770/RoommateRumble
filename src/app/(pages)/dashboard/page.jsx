"use client";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CustomChip } from "../groups/manage/[slug]/CustomChip";
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
import { getSession } from "next-auth/react";

export default function DashboardPage() {
    const [choreArr, setChoreArr] = React.useState(null);

    /*
// localhost:3000/api/get_all_chores

// gets all the chores of a username
export async function POST(request: Request) {
const { username } = await request.json();  
*/

    async function fetchChores() {
        const session = await getSession();
        const username = session?.user?.email;
        const response = await fetch("/api/get_all_chores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
        });
        const data = await response.json();
        setChoreArr(data.list);
    }

    const getCardBackgroundColor = (status) => {
        switch (status) {
            case 'Incomplete':
                return '#a87b7b'; // Light red for incomplete chores
            case 'Complete':
                return '#79937d'; // Light green for complete chores
            case 'In Progress':
                return '#c9be7c'; // Light blue for in progress chores    
            default:
                return '#000000'; // Default white color
        }
    };


    const startChore = (choreObj) => {
        console.log("Start Chore: ", choreObj.id);
        // Update chore status to "In Progress"

        choreObj.status = "In Progress";
        fetch("/api/update_chore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: choreObj.groupId, choreObj: choreObj }),
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
                body: JSON.stringify({ id: choreObj.groupId, choreObj: choreObj }),
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
                    groupId: choreObj.groupId,
                })
            }).then((response) => {
                return response.json();
            }).then((data) => {

                const scores = JSON.parse(data.scores);
                // Find the user in the scores json object
                for (let key in scores) {
                    console.log("KEY: " + key);

                    if (key === username) {
                        // Interpret 
                        scores[key] = parseInt(scores[key]) + parseInt(choreObj.points);
                        break;
                    }
                }

                // for (let i = 0; i < scores.length; i++) {
                //     if (scores[i].username === username) {
                //         scores[i].points += choreObj.points;
                //         break;
                //     }
                // }

                console.log("SETTING SCORES " + JSON.stringify(scores));
                fetch('/api/set_scores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        groupId: choreObj.groupId,
                        scores: JSON.stringify(scores),
                    })
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log('updated score data for group id:', choreObj.groupId);
                }).catch((error) => {
                    console.error('Update score error :', error);
                });
            }).catch((error) => {
                console.error('Error:', error);
            });
        });
    };


    React.useEffect(() => {

        async function getChores(username) {
            const response = await fetch("/api/get_all_chores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username }),
            });
            const data = await response.json();
            setChoreArr(data.list);
        }


        getSession().then((session) => {
            const username = session?.user?.email;
            getChores(username);
        });
    }, []);

    return (<Paper elevation={0} sx={{ marginLeft: "1.2vh", marginRight: "1.2vh", borderRadius: '1.2vh', height: 'calc(100vh - 1.2vh - 64px)', overflow: 'auto', backgroundColor: "background.background" }}>

        {choreArr === null ? (
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
                    {choreArr.length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Typography sx={{
                                background: 'linear-gradient(0deg, #8FBCBB 40%, #5E81AC 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold',
                                fontSize: '1.5rem'
                            }}>
                                Join a group to get started!
                            </Typography>
                        </Box>
                    ) : (
                        choreArr.map((chore) => (
                            <Grid item key={chore.id + "|" + chore.groupId} xs={12} sm={6} md={4} lg={3} sx={{ padding: "0.6vh" }}>
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
                                        <Typography sx={{ paddingTop: "1%", paddingBottom: "2%", ml: -0.5 }}>
                                            <CustomChip label={chore.status} size="small" style={{backgroundColor:`${getCardBackgroundColor(chore.status)}`}} />
                                            <CustomChip label={`${chore.points} points`} size="small" />
                                            <CustomChip label={chore.groupName} size="small" />
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {chore.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary"
                                            sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                                            {chore.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ padding: "2%" }}>
                                        {chore.status === "Incomplete" ? (
                                            <Button size="large" sx={{ fontWeight: "bold" }} onClick={() => startChore(chore)}>
                                                Start
                                            </Button>
                                        ) : (
 
                                            chore.status === "In Progress" ? (
                                                <Button size="large" sx={{ fontWeight: "bold" }} onClick={() => completeChore(chore)}>
                                                    Mark as complete
                                                </Button>
                                            ) : (
                                                <Button size="large" sx={{ fontWeight: "bold" }} disabled>
                                                    Completed
                                                </Button>
                                            )

                                        )}
                                    </CardActions>

                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        )}
    </Paper>
    );
}
