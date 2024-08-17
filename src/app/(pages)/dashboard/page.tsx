import Logout from "@/app/logout";
import { getServerSession } from "next-auth";
import {
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab, InputLabel,
    Paper, Select,
    Typography
} from '@mui/material';

export default async function DashboardPage() {
    const session = await getServerSession(); 

    // localhost:3000/user

    return (
        <>
        <Paper elevation={1} sx={{borderRadius: '1.2vh', bottom: '2.4vh', left: '2.4vh', padding: '1.2vh', position: 'fixed', width: 'calc(100vw - 4*1.2vh)', zIndex: 2, backgroundColor: "background.default", display: 'flex', justifyContent: 'space-between'}}>
        </Paper>
        
        <Paper elevation={0} sx={{borderRadius: '1.2vh', marginLeft: '1.2vh', width: 'calc(100vw - 2*1.2vh)', height: 'calc(100vh - 1.2vh - 64px)', overflow: 'auto', backgroundColor: "background.background"}}>
            <Typography variant="h1">Dashboard Page</Typography>
        </Paper>
    
        </>
    ); 
}