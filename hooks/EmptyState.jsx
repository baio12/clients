import React from 'react'

function EmptyState({ icon, title, message }) {
    return (
        <div>
            <div className='w-full flex justify-center'>
                <span className='w-full text-center'>
                    <div className='flex justify-center text-gray-icon-products'>
                        { icon }
                    </div>
                    <span className='block text-gray-900 text-sm font-medium mt-4'>
                        { title }
                    </span>
                    <span className='block text-gray-500 text-sm mt-1 w-full lg:max-w-[30%] mx-auto'>
                        { message }
                    </span>
                </span>
            </div>
        </div>
    )
}

export default EmptyState