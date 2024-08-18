import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/reset_group

// Receives a group id and resets the group's leaderboard and chores
export async function POST(request: Request) {
    try { 
        const { id } = await request.json();

        const sql = neon(process.env.DATABASE_URL as string);

        // Deletes all chores and resets leaderboard (all users have 0 points)
        // Delete all rows from table_{id} but do not delete the table
        const command = `DELETE FROM table_${id}`;
        await sql(command);

        // Reset leaderboard
        // Get the groups users column
        const response = await sql`SELECT * FROM groups WHERE id = ${id}`;
        const row = response[0];
        const usersCSV = row.users || "";
        // Create a set from the users column
        const usersSet = new Set<string>(usersCSV.split(","));

        const scoreJson = JSON.parse("{}");
        const array = Array.from(usersSet);
        for (let user of array) {
            scoreJson[user] = 0;
        }
        const response2 = await sql`UPDATE groups SET scores = ${JSON.stringify(scoreJson)} WHERE id = ${id}`;
        console.log(response2);
        return NextResponse.json({success: true}, {status: 200});
    }
    catch (error) {
        console.log("RESET GROUP ERROR: " + error);
        return NextResponse.json({error}, {status: 500});
    }
}