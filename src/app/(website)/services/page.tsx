import React from 'react'
import { ServiceHeader } from './_component/service-header'
import { AllService } from './_component/all-service';

const page = () => {

  return (
    <div className='mt-[100px]'>
      <div>
        <ServiceHeader />

        <AllService />
      </div>
    </div>
  )
}

export default page