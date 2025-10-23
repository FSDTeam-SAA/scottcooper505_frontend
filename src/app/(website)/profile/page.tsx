import React from 'react'
import PersonalInfoAvata from './_components/profile-info-avata'
import ProfileInfo from './_components/profile-form'

const ProfilePage = () => {
  return (
    <div className=' container mx-auto grid grid-cols-1 md:grid-cols-3 gap-[30px] mt-40 pb-24'>
      <div className='md:col-span-1 h-auto flex items-center justify-center'>
        <PersonalInfoAvata/>
      </div>
      <div className='md:col-span-2'>
        <ProfileInfo/>
      </div>
    </div>
  )
}

export default ProfilePage
