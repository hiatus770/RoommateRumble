import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/add_chore

// Receives a group id and chore object
export async function POST(request: Request) {
    try { 
        const { id, choreObj } = await request.json();

        const sql = neon(process.env.DATABASE_URL as string); 

        // Insert chore into table_{id}
        // Get the current unix timestamp
        const dateUnix = Date.now();  // ms since unix epoch
        const command = `INSERT INTO table_${id} (name, description, date, status, points, image) VALUES ($1, $2, $3, $4, $5, $6)`;
        const values = [choreObj.name, choreObj.description, dateUnix, choreObj.status, choreObj.points, choreObj.image];
        const response = await sql(command, values);
        return NextResponse.json({response});
    }
    catch (error) {
        return NextResponse.error(error);
    }
}