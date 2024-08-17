import { getSession } from "next-auth/react";
import React from "react";
import { useState } from "react";

interface LeaderboardProps {
    groupId: string; // This is the group id
}

export default function Leaderboard({groupId} : LeaderboardProps) {
    const [usersList, setUsersList] = useState([]);

    async function fetchUsersList() {
        const session = await getSession();
        const username = session?.user?.name;

        console.log("GROUP ID IS ", groupId);

        const response = await fetch('/api/get_scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupId: groupId,
            })
        });
        const data = await response.json();

        console.log("RESPONSE FROM THING: " + JSON.stringify(data));
        
    } 

    React.useEffect(() => {
        fetchUsersList();
    }, []);

    return (
        <>
            Leaderboard
        </>
    );
}