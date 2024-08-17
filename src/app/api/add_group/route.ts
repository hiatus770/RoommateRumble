import { NextResponse } from "next/server";
import {hash} from 'bcrypt';
import { neon } from "@neondatabase/serverless";

// localhost:3000/api/add_group

export async function POST(request: Request){
    try { 
        const {name, users} = await request.json();  // Name of the group and users CSV string
        console.log("CREATING DATABASE: ", {name, users});



        const sql = neon(process.env.DATABASE_URL as string); 

        const response = await sql `
        INSERT INTO groups (name, users)
        VALUES (${name}, ${users})
        RETURNING id
        `;
        console.log({ response });
        
        const groupId = response[0].id;
        const command = `CREATE TABLE IF NOT EXISTS table_${groupId} (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            status TEXT NOT NULL,
            points TEXT NOT NULL,
            image TEXT
          )`;
        
        // Create a table for the group (stores its tasks)
        const response2 = await sql(command);
        console.log({ response2 });
    } catch (e) {
        console.log({ e }); 
        return NextResponse.json({message: "Error! 🤪"}); // TODO: needs to be handled better :zany: 
    }

    return NextResponse.json({message: "Success!"});
}