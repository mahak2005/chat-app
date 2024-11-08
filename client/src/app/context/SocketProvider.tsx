// context/SocketProvider.tsx
"use client" 
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

// Define the structure of the SocketContext
interface ISocketContext {
  messages: string[]
  socket: Socket | null
  sendMessage: (msg: string) => void
}

// Create SocketContext
const SocketContext = createContext<ISocketContext | null>(null)

// Custom hook to access the socket context
export const useSocket = () => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return context
}

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<string[]>([])

  // Function to send a message
  const sendMessage = useCallback((msg: string) => {
    if (!socket) return
    socket.emit('event:message', { message: msg })
  }, [socket])

  // Function to handle messages received from the server
  const onMessageReceived = useCallback((msg: string) => {
    const { message } = JSON.parse(msg) as { message: string }
    setMessages((prev) => [...prev, message])
  }, [])

  // Setting up the socket connection when the component mounts
  useEffect(() => {
    const _socket = io('http://localhost:8000')

    _socket.on('message', onMessageReceived)
    setSocket(_socket)

    // Cleanup the socket connection on unmount
    return () => {
      _socket.off('message', onMessageReceived)
      _socket.disconnect()
    }
  }, [onMessageReceived])

  return (
    <SocketContext.Provider value={{ socket, messages, sendMessage }}>
      {children}
    </SocketContext.Provider>
  )
}
