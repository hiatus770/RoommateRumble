'use client';
import AppBar from '@mui/material/AppBar';
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useTheme} from "@mui/material";
import { getServerSession } from "next-auth";
import { getSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import { usePathname, redirect, useRouter} from 'next/navigation'

const pages = ['dashboard', 'verify', 'groups'];
const settings = ['Profile', 'Account', 'Logout'];

export default function ResponsiveAppBar() {
    const {palette} = useTheme();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const location = usePathname();
    const router = useRouter();
    //console.log("LOC: " + location.split('/')[1].toLowerCase());
    
    // async function getSession(){
    //     try {
    //         const session = await getServerSession();
    //         setUsername(session?.user?.email);            
    //     } catch (error) {
    //         console.error("Error getting session: ", error);
    //     }
    // }

    async function setupUsername(){
        const session = await getSession(); 
        setUsername(session?.user?.email);
    }

    React.useEffect(() => {
        setupUsername();
    }, []);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const openPage = (page) => {
        //navigate("/" + page);
        console.log("PAGE: " + page);
        router.push("/" + page);
        // redirect("/" + page);
        
    }
    const openMenu = (setting) => {
        console.log("Menu", setting);
        if (setting === "Logout") {
            signOut();
        }
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    //'#1d2126'

    return (
        <AppBar position="static" elevation={0} sx={{backgroundColor: 'appbar.background'}}>
            <Toolbar disableGutters>
                {/* <Avatar
                    src={`/logo.png`}
                    sx={{display: {xs: 'none', md: 'flex'}, ml: 2, pointerEvents: 'none'}}
                    variant="square"
                /> */}
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mx: 1,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: "bold",
                        letterSpacing: '.3rem',
                        color: 'primary.main',
                        textDecoration: 'none',
                    }}
                >
                    ROOMMATE RUMBLE
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="text.secondary"
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={() => {
                                openPage(page);
                                handleCloseUserMenu();
                            }}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Avatar
                    sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}
                    variant="square"
                />

                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'},
                        flexGrow: 1,
                        fontWeight: "bold",
                        letterSpacing: '.3rem',
                        color: 'primary.main',
                        textDecoration: 'none',
                    }}
                >
                    ROOMMATE RUMBLE
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {pages.map((page) => (
                        <Button
                            disableElevation
                            key={page}
                            onClick={() => openPage(page)}
                            sx={{
                                fontWeight: 'bold',
                                mx: 1,
                                color: (page.toLowerCase() === location.split('/')[1].toLowerCase()) ? 'primary.main' : 'text.secondary',
                                backgroundColor: (page.toLowerCase() === location.split('/')[1].toLowerCase()) ? 'appbar.button' : 'transparent',
                                ":hover": {
                                    color: 'primary.main',
                                    backgroundColor: (page.toLowerCase() === location.split('/')[1].toLowerCase()) ? 'appbar.button' : 'transparent'
                                },
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>

                <Box sx={{flexGrow: 0}}>
                    <Typography sx={{color: 'text.secondary', fontWeight: 'medium', m: 2}}>
                        {username}
                    </Typography>
                </Box>

                <Box sx={{flexGrow: 0}}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0, mr: 2}}>
                            <Avatar sx={{backgroundColor: 'primary.main'}}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => {
                                openMenu(setting);
                                handleCloseUserMenu();
                            }}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar></AppBar>
    );
}
