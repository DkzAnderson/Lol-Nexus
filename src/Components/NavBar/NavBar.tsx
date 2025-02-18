
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <section className='fixed z-50 top-0 w-full h-[10vh] border-b border-nd'>
        <div className='size-full flex items-center p-2 bg-st'>
            <Link
                className='text-txt font-bold text-4xl'
                to='/'
            >
                Inicio
            </Link>
        </div>
    </section>
  )
}
