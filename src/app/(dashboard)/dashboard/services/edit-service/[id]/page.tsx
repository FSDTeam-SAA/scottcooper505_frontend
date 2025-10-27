import React from 'react'
import EditServiceForm from '../_components/edit-service-form'

const EditServicePage = ({params}:{params:{id:string}}) => {
  return (
    <div>
      <h2>{params.id}</h2>
      <EditServiceForm/>
    </div>
  )
}

export default EditServicePage
