"use client"

import { logoutUser } from "@/src/services/Auth/logout";
import { Button } from "../ui/button";


const LogoutButton = () => {

    const handleLogout = async() =>{
        await logoutUser()
    }
    return (
        <div>
            <Button onClick={handleLogout} variant={"secondary"}>

            </Button>
        </div>
    );
};

export default LogoutButton;