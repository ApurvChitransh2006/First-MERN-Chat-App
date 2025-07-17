import React from 'react'
import Login from './Login'
import MessageDash from './MessageDash'
import {Routes, Route, Navigate} from "react-router"
import useChattStore from './store/chatmessage'
import { io, type Socket } from 'socket.io-client'

export const socket: Socket = io(import.meta.env.VITE_API_URL as string, {autoConnect: false})

const App: React.FC = () => {
  const {user} = useChattStore()
  const {setOnlineUsers, setMessage} = useChattStore()
  
  socket.on("getOnlineUsers", (lists)=>{
    setOnlineUsers(lists)
  })
  socket.on("allmessages", (lists)=>{
    setMessage(lists)
  })
  
  return (
    <>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/msgdash" element={user ? <MessageDash/> : <Navigate to={"/"}/>}/>
      </Routes>
    </>
  )
}

export default App