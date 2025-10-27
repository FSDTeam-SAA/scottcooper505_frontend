import React from 'react'
import BookingContainer from './_components/booking-container'
// import BookingPage from './_components/booking-page'

const BookingPages = () => {
  return (
    <div className='mt-32 container mx-auto'>
      <BookingContainer/>
      {/* <BookingPage serviceId={params.id}/> */}
    </div>
  )
}

export default BookingPages
