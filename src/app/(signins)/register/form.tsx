'use client';
import { FormEvent, useState } from "react";
import { redirect, useRouter } from 'next/navigation'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";


export default function Form() {

    const [selectedRole, setSelectedRole] = useState('parent');

    const router = useRouter(); 
    
    const handleRoleChange = (event: SelectChangeEvent<String>) => {
        setSelectedRole(event.target.value as string);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        console.log("USERNAME: " + formData.get("email")); 
        if (formData.get("email") === '' || formData.get("password") === ''){
            router.push("/error/EmailOrPasswordCannotBeEmpty")
            console.log("ERROR FOUND")
            return; 
        }

        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password"),
                type: "default",
            })
        });
        router.push("/login")
    }

    const defaultTheme = createTheme();

    return (
            <Container component="main" maxWidth="sm" sx={{minHeight: '100vh', backgroundColor: "background.paper",}}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: "center",
                        minHeight: '90vh'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register new user to Roommate Rumble
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Username"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                <Typography variant="body2" marginRight={1}>Have an account already?</Typography>
                                <Link href="/login" variant="body2">
                                    Login
                                </Link>
                            </div>

                    </Box>
                </Box>
            </Container>
    );

}