import HeroSection from '@/components/common/Hero-Section'
import React from 'react'
import AboutPage from './_components/AboutBody'

const page = () => {
    return (
        <div>
            <HeroSection
                img="/about.jpg"
                title="About Our Company"
                desc="We're on a mission to transform the industry with innovative solutions and exceptional "
            />
            <AboutPage/>
        </div>
    )
}

export default page