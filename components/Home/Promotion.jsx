import React from 'react';

const Promotion = ({pIURL}) => {
    return (
        <div className='h-[800px] w-full bg-gray-500 overflow-hiddden relative'>
            <img src={pIURL} alt="promotional Image" className='w-full h-full object-cover transition-all duration-700 grayscale hover:grayscale-0' />
            <div className='offer absolute top-[50%] -left-[100px] -translate-y-[50%]'>
                <h1 className='font-extrabold text-[150px] -rotate-90 text-red-700'>40% OFF</h1>
            </div>
        </div>
    );
};

export default Promotion;