import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/add_chore

// Receives a group id and chore object
export async function POST(request: Request){
    try { 
        const { id, choreObj } = await request.json();
        const sql = neon(process.env.DATABASE_URL as string); 

        // Insert chore into table_{id}
        // Get the current unix timestamp
        const dateUnix = Date.now();  // ms since unix epoch
        const response = await sql`INSERT INTO table_${id} (name, description, date, status, points, image) VALUES (${choreObj.name}, ${choreObj.description}, ${dateUnix}, ${choreObj.status}, ${choreObj.points}, ${choreObj.image})`;
        console.log(response);
        return NextResponse.json(response);
    }
    catch (error) {
        return NextResponse.error(error);
    }
}