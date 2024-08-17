
import { ReactNode } from 'react';
import { Inter } from "next/font/google";
import styles from './style.module.css';
import ResponsiveAppBar from '../(pages)/AppBar'
const inter = Inter({ subsets: ["latin"] });
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {nordDark, nordLight} from '../Themes';
import redirectOnType from "@/app/(signins)/login/redirectontype";
import { redirect } from "next/navigation";
import { usePathname } from 'next/navigation';
import getURL from './getUrl';


interface RootLayoutProps {
    children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const userData = await redirectOnType();
    if (userData === null) {
        redirect("/login"); 
    }

    // my guess is u can't use these client functions
    
    const isDarkMode = true;
    // const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;  // TODO: this don't work for some reason
    return (
        <main>
            <ThemeProvider theme={isDarkMode ? nordDark : nordLight}>
            <CssBaseline/>
            <ResponsiveAppBar />
                {children}
            </ThemeProvider>
        </main>
    );
}
