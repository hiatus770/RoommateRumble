import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/join_group

// add a username to a group
export async function POST(request: Request) {
    const {username, groupId} = await request.json();
    try {
        console.log("USERNAME", username);
        const sql = neon(process.env.DATABASE_URL as string);
        // Get the groups users column
        const response = await sql`SELECT * FROM groups WHERE id = ${groupId}`;
        const row = response[0];
        const usersCSV = row.users || "";
        // Create a set from the users column
        const usersSet = new Set(usersCSV.split(","));
        // Add the username to the set
        usersSet.add(username);
        // Update the users column
        const newUsersCSV = Array.from(usersSet).join(",");
        await sql`UPDATE groups SET users = ${newUsersCSV} WHERE id = ${groupId}`;
    } catch (e) {
        console.log({ e }); 
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }

    return NextResponse.json({message: "Success!"});
}