'use server';
import { getServerSession } from "next-auth";
import Router, { useRouter } from "next/router";

import { neon } from "@neondatabase/serverless";

export default async function redirectOnType() {
    const session = await getServerSession();

    if (!session){
        return null; 
    }
    // Grab data from awAatabse 
    const sql = neon(process.env.DATABASE_URL as string) 
    const response = await sql`SELECT * FROM USERS WHERE email=${session?.user?.email} `;

    const user = response[0]; 

    console.log("RESPONSE: " + JSON.stringify(response)); 

    if (response.length === 0){
        return null;    
    }
    

    const email = user.email; 
    const type = user.type; 
    const child = user.child; 
    const notes = user.notes;



    let userData = {email: email, type: type, child: child, notes: notes};
    return userData; 
}