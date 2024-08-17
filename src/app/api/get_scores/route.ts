
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import updateScores from "../updateScores";

// localhost:3000/api/leave_group

// remove a username from a group
export async function POST(request: Request) {
    const {groupId} = await request.json();
    try {

        updateScores(groupId); 
            // still seems off idk maybe try
        const sql = neon(process.env.DATABASE_URL as string);
        
        const command = `SELECT * FROM groups where id = ${groupId}`;
        const response = await sql(command);
        console.log(JSON.stringify(response)); 

        // Now iterate get the column calles "scores" and return it as a response
        const scores = response[0].scores;

        return NextResponse.json({scores});
    } catch (e) {
        console.log({ e }); 
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }

    return NextResponse.json({message: "Success!"});
}