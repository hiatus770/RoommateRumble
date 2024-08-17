import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Logout from "./logout";

export default async function LoginInOut(){
    const session = await getServerSession(); 

    if (!!session){
        return (
            <Logout/> 
        ); 
    } else {
        return (
            <Link href="/login"> LOGIN </Link> 
        )
    }
}