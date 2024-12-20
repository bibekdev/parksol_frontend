import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: 'admin',
    password: 'admin123',
  })

  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async e => {
    e.preventDefault()
    axios
      .post('http://localhost:4000/login', values)
      .then(res => {
        localStorage.setItem('admin-token', res.data.token)
        navigate('/admin')
      })
      .catch(error => {
        toast.error('Invalid credentials')
      })
  }

  return (
    <section className='bg-gray-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Link
          to='/'
          className='flex items-center gap-1 mb-10'>
          <div className='bg-black size-8 text-lg text-white font-bold flex items-center justify-center rounded-md'>
            P
          </div>
          <p className='text-xl font-semibold'>Parksol</p>
        </Link>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Admin Access
            </h1>
            <form
              onSubmit={onSubmit}
              className='space-y-4 md:space-y-6'
              action='#'>
              <div>
                <label
                  for='username'
                  className='block mb-2 text-sm font-medium text-gray-900 '>
                  Username
                </label>
                <input
                  type='text'
                  value={values.username}
                  onChange={onChange}
                  name='username'
                  id='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5'
                  required=''
                />
              </div>
              <div>
                <label
                  for='password'
                  className='block mb-2 text-sm font-medium text-gray-900'>
                  Password
                </label>
                <input
                  type='password'
                  value={values.password}
                  onChange={onChange}
                  name='password'
                  id='password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5'
                  required=''
                />
              </div>

              <button
                type='submit'
                className='w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
export default LoginPage
