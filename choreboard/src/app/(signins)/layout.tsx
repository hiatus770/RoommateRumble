import { ReactNode } from 'react';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {nordDark, nordLight} from '../Themes';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const isDarkMode = true;
    // const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;  // TODO: this don't work for some reason
    return (
        <main>
                <ThemeProvider theme={isDarkMode ? nordDark : nordLight}>
                <CssBaseline/>
                    {children}
                </ThemeProvider>
        </main>
    );
}