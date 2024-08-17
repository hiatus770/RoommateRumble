import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/get_user_groups
// Returns the groups that a user is in, list of group objects {id, name, users}
export async function POST(request: Request) {
    const { username } = await request.json(); 
    console.log(username); 

    const groupList = [];
    try {
        console.log("USERNAME", username);
        const sql = neon(process.env.DATABASE_URL as string);
        
        // First get rows of groups that have the username in the user column 
        const response = await sql`SELECT * FROM groups WHERE position(${username} in users) > 0`;
        
        // For each valid group that has its username push it to an array 
        for (const row of response) {
            // Get users column from the row
            const users = row.users;

            if (!users) {
                continue;
            }

            // Split the users column into a set
            const usersSet = new Set(users.split(","));
            // Actually check if the username is in the set
            if (usersSet.has(username)) {
                // Array push 
               groupList.push({id: row.id, name: row.name, users: row.users});
            }
        }
    } catch (e) {
        console.log({ e }); 
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }

    // Return json to clientside    j
    return NextResponse.json({groupList});
}