import { serverFetch } from "@/lib/server-fetch";



export const adminGetAllUser = async() =>{
    try {
        const res = await serverFetch.get("/user/allUser",{
            headers:{
                "Content-Type": "application/json" 
            }
        })
        const data = await res.json()
        console.log(data,"this is fromservie");
        return data
    } catch (error) {
    console.error("Error fetching requests:", error);
    return { success: false, message: "Failed to fetch Users" };
    }
}
export const updateUserStatus = async(userId:string, userStatus:string) =>{
    try {
        const res = await serverFetch.patch(`/user/${userId}/status`,{
            headers:{
                "Content-Type": "application/json" 
            },
            body:JSON.stringify({userStatus})
        })
        const data = await res.json()
        return data
    } catch (error) {
    console.error("Error fetching requests:", error);
    return { success: false, message: "Failed to fetch Users" };
    }
}

export const deleteUser = async(id:string) =>{
    try {
        const res = await serverFetch.delete(`/user/delete/${id}`,{
            headers:{
                "Content-Type": "application/json" 
            }
        })
        const data = await res.json()
        return data
    } catch (error) {
    console.error("Error fetching requests:", error);
    return { success: false, message: "Failed to fetch Users" };
    }
}