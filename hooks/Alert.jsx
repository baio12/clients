import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, ExclamationIcon, XCircleIcon, InformationCircleIcon, XIcon } from '@heroicons/react/solid'

function Alert({ type, show, title, description, onClose }) {

    const [showAlert, setShowAlert] = useState(show);

    const bgColorFor = {
        'Success': 'bg-green-50',
        'Warning': 'bg-yellow-50',
        'Error': 'bg-red-50',
        'Info': 'bg-blue-50'
    }

    const titleColorFor = {
        'Success': 'text-green-800',
        'Warning': 'text-yellow-800',
        'Error': 'text-red-800',
        'Info': 'text-blue-800'
    }

    const descriptionColorFor = {
        'Success': 'text-green-700',
        'Warning': 'text-yellow-700',
        'Error': 'text-red-700',
        'Info': 'text-blue-700'
    }

    const closeButtonColorFor = {
        'Success': ' bg-green-50 text-green-500 hover:bg-green-100',
        'Warning': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100',
        'Error': 'bg-red-50 text-red-500 hover:bg-red-100',
        'Info': 'bg-blue-50 text-blue-500 hover:bg-blue-100'
    }

    const iconFor = {
        'Success': <CheckCircleIcon className="bg-green-50 text-green-500 hover:bg-green-100 h-5 w-5" aria-hidden="true" />,
        'Warning': <ExclamationIcon className="bg-yellow-50 text-yellow-500 hover:bg-yellow-100 h-5 w-5" aria-hidden="true" />,
        'Error': <XCircleIcon className="bg-red-50 text-red-500 hover:bg-red-100 h-5 w-5" aria-hidden="true" />,
        'Info': <InformationCircleIcon className="bg-blue-50 text-blue-500 hover:bg-blue-100' h-5 w-5" aria-hidden="true" />
    }

    useEffect(() => {
        setShowAlert(show)
    }, [show]);

    return (
        <Transition
            show={showAlert}
            enter="transition-all ease-in"
            enterFrom="max-h-0 opacity-0"
            enterTo="max-h-screen opacity-100"
            leave="transition-all ease-out"
            leaveFrom="max-h-screen opacity-100"
            leaveTo="max-h-0 opacity-0"
            afterLeave={() => onClose && onClose()}>
            <div className={`${bgColorFor[type]} rounded-md p-4 shadow-md`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        {iconFor[type]}
                    </div>
                    <div className="ml-3">
                        <h3 className={`${titleColorFor[type]} text-sm font-medium`}>{title}</h3>
                        {description && (
                            <p className={`${descriptionColorFor[type]} mt-2 text-sm`}>
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                onClick={() => setShowAlert(false)}
                                type="button"
                                className={`${closeButtonColorFor[type]} transition-all inline-flex rounded-md p-1.5 focus:outline-none`}>
                                <span className="sr-only">Cerrar</span>
                                <XIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}

Alert.propTypes = {
    type: PropTypes.oneOf(['Success', 'Warning', 'Error', 'Info']),
    show: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    onClose: PropTypes.func
}

Alert.defaultProps = {
    type: 'Error',
    show: false
}

export default Alert;