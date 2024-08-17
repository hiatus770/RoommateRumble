import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/delete_chore

// Receives a group id and chore object
export async function POST(request: Request) {
    try { 
        const { groupId, choreId } = await request.json();

        const sql = neon(process.env.DATABASE_URL as string);

        // Delete chore with choreId from table_{groupId}
        const command = `DELETE FROM table_${groupId} WHERE id = ${choreId}`;
        const response = await sql(command);
        return NextResponse.json({response});
    }
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}