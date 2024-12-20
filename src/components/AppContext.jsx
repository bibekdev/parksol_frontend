import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const AppContext = createContext(undefined)

export const AppContextProvider = ({ children }) => {
  const [slotData, setSlotData] = useState({
    available_slots: 0,
    s1: { occupied: false, booked: false },
    s2: { occupied: false, booked: false },
    s3: { occupied: false, booked: false },
    s4: { occupied: false, booked: false },
  })

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('http://localhost:4000')

    socket.on('slot_update', data => {
      setSlotData(data)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <AppContext.Provider value={{ slotData }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
