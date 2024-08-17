import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface LeaderboardProps {
    groupId: string;
}

interface LeaderboardEntry {
    username: string;
    score: number;
}

export default function Leaderboard({ groupId }: LeaderboardProps) {
    const [leaderboardList, setLeaderboardList] = useState<LeaderboardEntry[]>([]);
    const [scores, setScores] = useState<Record<string, number>>({});

    async function fetchLeaderboardList() {
        const session = await getSession();
        const username = session?.user?.name;

        console.log("GROUP ID IS ", groupId);

        const response = await fetch('/api/get_scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupId })
        });
        const data = await response.json();

        console.log("DATA: " + JSON.stringify(data));
        const tempScores = JSON.parse(data.scores);

        const leaderboard: LeaderboardEntry[] = [];
        for (let key in tempScores) {
            leaderboard.push({ username: key, score: tempScores[key] });
        }

        leaderboard.sort((a, b) => b.score - a.score);

        setScores(tempScores);
        setLeaderboardList(leaderboard);
    }

    useEffect(() => {
        fetchLeaderboardList();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader sx={{}} aria-label="simple table">
                <TableHead sx={{ bgcolor: 'background.paper' }}>
                    <TableRow>
                        <TableCell sx={{ width: 'auto' }}>Username</TableCell>
                        <TableCell sx={{ width: 'fit-content' }}>Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaderboardList.map((pair) => (
                        <TableRow key={pair.username + pair.score}>
                            <TableCell sx={{ width: 'auto' }}>{pair.username}</TableCell>
                            <TableCell sx={{ width: 'fit-content' }}>{pair.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}