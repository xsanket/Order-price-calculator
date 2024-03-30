import React from 'react'
import PriceCalculationForm from '../components/PriceCalculationForm'


export default function HomePage() {
    return (
        <div className='flex'>
            <div className="background-color: #F0F2F5 bg-cover w-full bg-no-repeat min-h-screen flex items-center justify-center "
                style={{
                    backgroundImage: "url('/bg.jpg')"
                }} >
                <PriceCalculationForm className='opacity-100 w-full flex items-center justify-center content-center' />
            </div>


        </div>
    )
}
