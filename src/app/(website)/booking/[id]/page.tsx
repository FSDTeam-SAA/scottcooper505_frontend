import React from 'react'
import BookingPage from '../_components/booking-page'

const SingleBookingPage = ({params}:{params:{id:string}}) => {
  return (
    <div className='container mx-auto mt-32 pb-12 pt-5'>
      <BookingPage serviceId={params.id}/>
    </div>
  )
}

export default SingleBookingPage
