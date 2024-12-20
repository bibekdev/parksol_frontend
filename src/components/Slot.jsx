import { useEffect, useState } from 'react'
import { useAppContext } from './AppContext'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export const SlotData = () => {
  const location = useLocation()
  const { slotData } = useAppContext()
  const [todayPrice, setTodayPrice] = useState(0)

  useEffect(() => {
    axios
      .get('http://localhost:4000/today-price')
      .then(res => {
        setTodayPrice(res.data.price)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className='mt-10 lg:w-[80%] mx-auto w-full px-5 lg:px-0'>
      {location.pathname === '/' && (
        <h1 className='text-lg font-semibold flex items-center gap-2'>
          Parking Slot Status <div className='circle pulse bg-green-500'></div>{' '}
        </h1>
      )}
      <p className='text-base font-medium'>Today's Price: Rs.{todayPrice}/hr</p>
      <p className='text-base font-medium'>
        Available Slots: {slotData.available_slots}
      </p>
      <ul className='flex gap-2 mt-5'>
        {Object.keys(slotData)
          .filter(key => key.startsWith('s'))
          .map(slot => (
            <li
              key={slot}
              className={`size-14 flex items-center justify-center ${
                slotData[slot].occupied ? 'bg-red-500' : 'bg-green-500'
              }`}>
              {slot.toUpperCase()}
            </li>
          ))}
      </ul>
      <div className='mt-2 flex gap-4'>
        <div className='flex items-center gap-2'>
          <div className='size-3 bg-red-500'></div>
          <p>Not available</p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='size-3 bg-green-500'></div>
          <p>Available</p>
        </div>
      </div>
    </div>
  )
}
