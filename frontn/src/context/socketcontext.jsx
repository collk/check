import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authcontext";
import { io } from "socket.io-client";


 const SocketContext=createContext()

 export const useSocketContext=()=>{
    return useContext(SocketContext)
 }

export const SocketContextProvider=({children})=>{

    const [socket,setsocket]=useState(null)
    const [online ,setonline]=useState([])

    const {authuser}=useAuthContext()

    useEffect(()=>{

        if(authuser){
            const socket=io("https://connectify-1-3470.onrender.com",{
                query:{
                    userid:authuser._id
                }
        })

            setsocket(socket)

            socket.on("getonline",(users)=>{
                  setonline(users)
            })

            return ()=> socket.close()
        }
        else {
            if(socket){
                socket.close()
                setsocket(null)
            }
        }

    },[authuser])
    

   return (  <SocketContext.Provider value={{socket,online}}>
       {children}
    </SocketContext.Provider>
    )

}
