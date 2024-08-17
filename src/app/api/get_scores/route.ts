
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/leave_group

// remove a username from a group
export async function POST(request: Request) {
    const {groupId} = await request.json();
    try {
        console.log("USERNAME", username);
        const sql = neon(process.env.DATABASE_URL as string);
        // Get the user 
        const response = await sql 



    } catch (e) {
        console.log({ e }); 
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }

    return NextResponse.json({message: "Success!"});
}