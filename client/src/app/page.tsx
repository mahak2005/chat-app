// app/page.tsx (or any other component)

"use client" // Make sure the component is client-side rendered

import { useState } from "react"
import { useSocket } from './context/SocketProvider'

export default function Home() {
  const [message, setMessage] = useState('')
  const { messages, sendMessage } = useSocket()  // Access socket context using useSocket

  const handleSubmit = () => {
    if (message === "") return
    sendMessage(message)
    setMessage('')  // Clear the input field after sending
  }

  return (
    <div className="m-10 h-[600px] flex flex-col border-2 rounded-md border-white p-2">
      <div className="h-full overflow-y-auto flex flex-col p-2 overflow-x-hidden gap-1">
        {/* Display the messages */}
        {messages.map((msg, index) => (
          <div key={index} className="bg-zinc-700 p-2 rounded-md mb-2">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          value={message}
          placeholder="Message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit()
            }
          }}
          className="bg-zinc-700 w-full px-6 py-2 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-2 border-2 border-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  )
}
