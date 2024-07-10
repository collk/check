import {create} from 'zustand'
import React from "react"

const userconv=create((set)=>({

    selectedConversation:null,
    setSelectedConversation:(selectedConversation)=>set({ selectedConversation}),
    messages:[],
    setMessages:(messages)=>set({messages})


}))

export default userconv