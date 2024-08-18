import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/update_chore

// Receives a group id and chore object
export async function POST(request: Request) {
    try { 
        const { id, choreObj } = await request.json();

        const sql = neon(process.env.DATABASE_URL as string); 

        // Update table_{id}, find row with id = choreObj.id and update the row with choreObj
        // const command = `INSERT INTO table_${id} (name, description, date, status, points, image) VALUES ($1, $2, $3, $4, $5, $6)`;


        const command = `UPDATE table_${id} SET name = '${choreObj.name}', description = '${choreObj.description}', date = '${choreObj.date}', status = '${choreObj.status}', points = '${choreObj.points}', image = '${choreObj.image}' WHERE id = ${choreObj.id}`;
        console.log("CHORE UPDATE COMMAND: " + command);
        const response = await sql(command);
        console.log("CHORE UPDATE RESPONSE: " + response);
        return NextResponse.json(response);
    }
    catch (error) {
        console.log("CHORE UPDATE ERROR: " + error);
        return NextResponse.error();
    }
}