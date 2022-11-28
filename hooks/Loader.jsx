import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import Image from 'next/image';

function Loader({ show, title, message }) {

    useEffect(() => {
        if (document) {
            document.documentElement.style.paddingRight = show ? "0px" : null;
            document.documentElement.style.overflow = show ? "hidden" : null;
        }
    }, [show])

    return (
        <div>
            <Transition.Root show={show}>
                <div className='relative z-[999]'>
                    <Transition.Child
                        enter="ease-out duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                </div>
                <div className="fixed z-[999] inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            enter="ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex-grow items-center relative w-full h-48 animate-wiggle">
                                    <Image
                                        src='https://cdn.fixat.mx/assets/invoicing/fixi-silla.png'
                                        alt='Cargando'
                                        layout='fill'
                                        objectFit='contain'
                                    />
                                </div>
                                <h2 className='text-white mt-4'>{title}</h2>
                                <h4 className='text-white mt-4 max-w-[24rem]'>{message}</h4>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition.Root>
        </div>
    )
}

Loader.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string
}

Loader.defaultProps = {
    show: false,
    title: "Procesando..."
}

export default Loader;