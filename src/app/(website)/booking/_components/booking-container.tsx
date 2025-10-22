import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BookingContainer = () => {
  return (
    <div>
        <Link href="/">
            <button className='text-base font-medium text-[#4D0EB9] leading-[120%] flex items-center gap-2'><ChevronLeft />Back</button>
        </Link>
      <div>
        <h1 className='text-2xl md:text-3xl lg:text-[40px] font-bold text-[#131313] leading-[120%] text-center'>Booking System</h1>
        <p className='text-base md:text-lg font-normal text-[#2F2F2F] leading-[170%] text-center pt-2 pb-4 md:pb-6 lg:pb-8'>Select a date and time slot to schedule your appointment</p>
      </div>
    </div>
  )
}

export default BookingContainer
