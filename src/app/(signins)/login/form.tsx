"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getServerSession } from "next-auth";
import redirectOnType from "./redirectontype";
import { stringify } from "querystring";
import {
    Button,
    CircularProgress,
} from "@mui/material";
import Image from "next/image";

export default function Form() {
    const router = useRouter();
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [pendingLogin, setPendingLogin] = useState(false); // Add this line

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        
        e.preventDefault();

        console.log("SUBMITTING FORM"); 

        const fData = new FormData(e.currentTarget);

        const email = (fData.get("email")?.toString() || "").trim().toLowerCase();

        // Does not follow character restrictions
        if (!(/^[0-9a-zA-Z_.-]+$/.test(email))) {
            setUsernameError(true);
            setPasswordError(true);
            setUsernameMessage("Invalid characters provided");
        } else {
            const password = fData.get("password") || "";
            setPendingLogin(true);  // Start loading spinner
            setUsernameError(false);

            const response = await signIn("credentials", {
                email: fData.get("email"),
                password: password,
                redirect: false,
            });

            if (response?.error) {  // Failed login
                setPasswordError(true);
                setPasswordMessage("Incorrect password");
            }
            

            if (!response?.error) {
                router.push("/groups");
                router.refresh();
            }

            setPendingLogin(false);  // Stop loading spinner
        }

    };

    const defaultTheme = createTheme();

    return (
        <>
            <Grid container flexDirection="row">
                <CssBaseline />
                <Grid
                    item
                    sx={{
                        height: "calc(100vh - 4vh)",
                        width: "calc(60vw - 2vh)",
                        marginTop: "2vh",
                        marginBottom: "2vh",
                        marginLeft: "2vh",
                    }}
                >
                    <div style={{borderRadius: '1vh 0px 0px 1vh', overflow: 'hidden', width: "100%", height: "100%"}}>
                        <Image src="/background.png" alt="background" width={0} height={0} sizes="100vw" style={{ width: 'auto', height: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: "none" }} />
                    </div>
                </Grid>

                <Grid item sx={{
                            marginTop: "2vh",
                            width: "calc(40vw - 2vh)",
                            height: "calc(100vh - 4vh)",
                            backgroundColor: "background.paper",
                            borderRadius: '0px 1vh 1vh 0px',
                        }}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{height: "100%", transform: "translate(0px, -48px)"}}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{
                                mt: 1,
                                width: "90%",
                            }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Username"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={usernameError}
                                helperText={
                                    usernameError ? usernameMessage : ""
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={
                                    usernameError
                                        ? ""
                                        : passwordError
                                            ? passwordMessage
                                            : ""
                                }
                            />
                            
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            
                            {pendingLogin ? (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                    disabled
                                >
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    Login
                                </Button>
                            )}

                       
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                <Typography variant="body2" marginRight={1}>Do not have an account?</Typography>
                                <Link href="/register" variant="body2">
                                    Sign up
                                </Link>
                            </div>
         
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
