import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/get_all_chores

// gets all the chores of a username
export async function POST(request: Request) {
    const { username } = await request.json();  
    console.log("GETTING ALL CHORES FOR: ", username);

    // Get all groups that the username is in
    const groupList = [];  // list of ids
    try {
        const sql = neon(process.env.DATABASE_URL as string);
        
        // First check if username is in sql database user table 
        const userResponse = await sql`SELECT * FROM users WHERE email = ${username}`;
        if (userResponse.length === 0) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
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
                console.log("USER SET DOES HAVE USER " + username); 
                groupList.push({id: row.id, name: row.name});
            }
        }
    } catch (e) {
        console.log({ e }); 
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }

    const choreList = [];
    try {
        const sql = neon(process.env.DATABASE_URL as string);
        
        for (const pair of groupList) {  // For each group id
            // Get all chores (rows) from table_{id}
            const command = `SELECT * FROM table_${pair.id}`;
            const response = await sql(command);
            for (const row of response) {
                const newRow = row;
                newRow.groupId = pair.id;  // Add group id to the row
                newRow.groupName = pair.name;  // Add group name to the row
                choreList.push(newRow);
            }
        }
    } catch (e) {
        console.log({ e }); 
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }

    // Return json to clientside
    return NextResponse.json({list: choreList});
}