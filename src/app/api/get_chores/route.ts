import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/get_chores

// fetches a list of chores given a group id
export async function POST(request: Request) {
    const { id } = await request.json();  // Get group id
    console.log("GETTING CHORES FOR GROUP ID: " + id); 

    const choreList = [];
    try {
        const sql = neon(process.env.DATABASE_URL as string);
        
        // Get all chores (rows) from table_{id}
        const command = `SELECT * FROM table_${id}`;
        const response = await sql(command);
        for (const row of response) {
            choreList.push(row);
        }
    } catch (e) {
        console.log({ e }); 
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }

    // Return json to clientside
    return NextResponse.json({list: choreList});
}