


import { neon } from "@neondatabase/serverless";
// go to the thing that cfalls it
export default async function updateScores(groupId: string) {

    console.log("Updating scores with default values"); 
    
    const sql = neon(process.env.DATABASE_URL as string);
    // Get the groups users column
    const response = await sql`SELECT * FROM groups WHERE id = ${groupId}`;
    const row = response[0];
    const usersCSV = row.users || "";
    // Create a set from the users column
    const usersSet = new Set<string>(usersCSV.split(","));

    let scores = row.scores;
    if (scores === null) {
        scores = "{}";  
    const scoreJson = JSON.parse(scores);


    // on creation of group or addition of new user?
    
    /// Iterate throug hthe users and check if user is not in the score json, if it isn't
    const array = Array.from(usersSet);
    for (let user of array) {
        if (scoreJson[user] === null) {
            scoreJson[user] = 0;
        }
    } 

        

    // "username: 0"
    
     await sql`UPDATE groups SET scores = ${JSON.stringify(scoreJson)} WHERE id = ${groupId}`;
}