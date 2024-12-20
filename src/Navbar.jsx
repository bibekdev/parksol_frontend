import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-gray-100 w-full h-[60px] flex items-center'>
      <div className='lg:w-[80%] w-full px-5 lg:px-0 mx-auto flex items-center justify-between'>
        <Link
          to='/'
          className='flex items-center gap-1'>
          <div className='bg-black size-6 p-3 text-white font-bold flex items-center justify-center rounded-md'>
            P
          </div>
          Parksol
        </Link>
        {/* <div>
          <Link to='/login'>Login</Link>/<Link to='/register'>Register</Link>
        </div> */}
      </div>
    </div>
  )
}

export default Navbar
