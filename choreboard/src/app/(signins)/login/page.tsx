
import { FormEvent } from "react";
import Form from "./form";
import { getServerSession } from "next-auth";
import redirectOnType from "./redirectontype";
import { redirect } from "next/navigation";

export default async function LoginPage(){
    const session = await getServerSession();

    const user = await redirectOnType();
    console.log("NOW REDIRECTING . . ."); 
    console.log(JSON.stringify(session)); 
    if (session) {        
        redirect("/groups"); 
    }
    return (
        <Form /> 
    ); 
}