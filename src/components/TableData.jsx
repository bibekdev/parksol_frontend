import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment'
import toast from 'react-hot-toast'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const TableData = () => {
  const [data, setData] = useState([])
  const [pdfUrl, setPdfUrl] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:4000/history')
      .then(res => {
        setData(res.data)
      })
      .catch(() => {})
  }, [])

  const handleViewPdf = async id => {
    const response = await fetch(`http://localhost:4000/generate-receipt/${id}`)
    if (!response.ok) {
      toast.error('Failed to fetch PDF')
    }
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    setPdfUrl(url)
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl)
      printWindow.print()
    }
  }

  return (
    <div className='mt-10 lg:w-[80%] mx-auto w-full px-5 lg:px-0'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Parking History</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className='px-5 py-2 text-white text-sm rounded-md bg-zinc-800'>
          Edit Price
        </button>
        <ModalContent
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      </div>

      <div className='relative mt-5 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3'>
                ID
              </th>
              <th
                scope='col'
                className='px-6 py-3'>
                Slot
              </th>
              <th
                scope='col'
                className='px-6 py-3'>
                Start Time
              </th>
              <th
                scope='col'
                className='px-6 py-3'>
                End Time
              </th>
              <th
                scope='col'
                className='px-6 py-3'>
                Duration
              </th>
              <th
                scope='col'
                className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr
                key={item._id}
                className='odd:bg-white even:bg-gray-50 border-b '>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                  {item._id}
                </th>
                <td className='px-6 py-4'>
                  {item.slot.charAt(0).toUpperCase() + item.slot.slice(1)}
                </td>
                <td className='px-6 py-4'>
                  {moment(item.startTime).format('MMM Do YYYY, h:mm a')}
                </td>
                <td className='px-6 py-4'>
                  {moment(item.endTime).format('MMM Do YYYY, h:mm a')}
                </td>
                <td className='px-6 py-4'>
                  {item.duration} {item.duration === 1 ? 'minute' : 'minutes'}
                </td>
                <td
                  onClick={() => handleViewPdf(item._id)}
                  className='px-6 py-4 hover:text-blue-500 cursor-pointer hover:underline'>
                  View Pdf
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const ModalContent = ({ isOpen, setIsOpen }) => {
  const [values, setValues] = useState({
    weekendPrice: 0,
    weekdayPrice: 0,
  })
  const [priceId, setPriceId] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:4000/price').then(res => {
      setPriceId(res.data._id)
      setValues({
        weekdayPrice: res.data.weekdayPrice,
        weekendPrice: res.data.weekendPrice,
      })
    })
  }, [])

  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: +e.target.value,
    })
  }

  const onSubmit = e => {
    console.log(values)
    e.preventDefault()
    axios
      .put(`http://localhost:4000/price-update/${priceId}`, values)
      .then(res => {
        setValues({
          weekdayPrice: res.data.weekdayPrice,
          weekendPrice: res.data.weekendPrice,
        })
        setIsOpen(false)
        // localStorage.setItem('admin-token', res.data.token)
        // navigate('/admin')
      })
      .catch(error => {
        toast.error('Invalid credentials')
      })
  }

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={() => setIsOpen(false)}>
      <div className='fixed bg-black/40 inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>
            <DialogTitle
              as='h3'
              className='text-base/7 font-medium mb-10'>
              Edit Price
            </DialogTitle>

            <form
              onSubmit={onSubmit}
              className='space-y-4 md:space-y-6'
              action='#'>
              <div>
                <label
                  for='username'
                  className='block mb-2 text-sm font-medium text-gray-900 '>
                  Weekday Price
                </label>
                <input
                  type='text'
                  value={values.weekdayPrice}
                  onChange={onChange}
                  name='weekdayPrice'
                  id='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5'
                  required=''
                />
              </div>
              <div>
                <label
                  for='password'
                  className='block mb-2 text-sm font-medium text-gray-900'>
                  Weekend Price
                </label>
                <input
                  type='text'
                  value={values.weekendPrice}
                  onChange={onChange}
                  name='weekendPrice'
                  id='password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5'
                  required=''
                />
              </div>

              <button
                type='submit'
                className='w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Edit
              </button>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default TableData
