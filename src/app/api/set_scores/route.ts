
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/leave_group

// remove a username from a group
export async function POST(request: Request) {
    const { scores, groupId } = await request.json();
    try {
        
        const sql = neon(process.env.DATABASE_URL as string);
        // Get the groups users column
        const response = await sql`SELECT * FROM groups WHERE id = ${groupId}`;
        const row = response[0];
        
        await sql`UPDATE groups SET scores = ${scores} WHERE id = ${groupId}`;
    } catch (e) {
        console.log({ e }); 
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }

    return NextResponse.json({message: "Success!"});
}