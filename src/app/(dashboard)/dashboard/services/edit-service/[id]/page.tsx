import React from 'react'
import EditServiceForm from '../_components/edit-service-form'

const EditServicePage = ({params}:{params:{id:string}}) => {
  return (
    <div className='p-5'>
      <EditServiceForm serviceId={params.id}/>
    </div>
  )
}

export default EditServicePage
