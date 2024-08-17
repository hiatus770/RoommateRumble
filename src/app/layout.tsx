import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import LoginInOut from "./loginout";
import styles from './style.module.css';
import ResponsiveAppBar from './(pages)/AppBar'
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {nordDark, nordLight} from './Themes';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roommate Rumble"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDarkMode = true;

  return (
    <html lang="en" style={{backgroundColor: isDarkMode ? '#434C5E' : '#D8DEE9'}}>
      <body className={inter.className}>
      <ThemeProvider theme={isDarkMode ? nordDark : nordLight}>
            <CssBaseline/>
          {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
