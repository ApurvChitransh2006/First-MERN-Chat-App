import { create } from 'zustand'
import { socket } from '../App'

type Message = {
  sender: string;
  receiver: string;
  message: string;
};

type ChattStore = {
  user: string,
  recieversDisplay: string
  onlineUsers: string[],
  messages: Message[]
  login: (name: string) => void,
  logout: ()=> void,
  setOnlineUsers: (lists: string[])=>void,
  setRecieversDisplay: (name: string)=> void,
  setMessage: (lists: Message[])=>void
  sendMessage: (obj: Message)=> void
}


const useChattStore = create<ChattStore>()((set, get) => ({
  user: "",
  recieversDisplay: "",
  onlineUsers: [],
  messages: [],
  login: (name)=>{
    set({user: name})
    socket.connect()
    socket.emit("person", {name: get().user})
  },
  logout: ()=>{
    socket.disconnect()
    set({user: ""})
  },
  setOnlineUsers: (lists)=>{
    let lists2 = lists.filter(item => item !== get().user);
    set({onlineUsers: Array.isArray(lists2) ? [...lists2] : []})
  },
  setRecieversDisplay: (name)=> {
    set({recieversDisplay: name})
  },
  setMessage: (lists) => {
    set({messages: lists})
  },
  sendMessage: (obj)=>{
    socket.emit("msgsend", obj)
  }
}))

export default useChattStore