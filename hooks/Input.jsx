import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Tooltip from './Tooltip';

function Input({ label, labelDescription, needed, info, leftIcon, type, name, id, placeholder, rightIcon, rightIconAction, error, disabledInput, ...rest }) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                    {labelDescription && <span className='ml-1 text-xs text-gray-400'>{labelDescription}</span>}
                    {needed && <span className='text-red-400'>*</span>}
                    {info &&
                        <span className='inline-block ml-2 -mb-1'>
                            <Tooltip title={info} />
                        </span>
                    }
                </label>
            )}
            <div className="mt-1 relative rounded-md shadow-sm">
                {leftIcon && (
                    <div className="absolute inset-y-0 max-w-[1.25rem] left-0 ml-3 flex items-center pointer-events-none overflow-hidden">
                        {leftIcon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    id={id}
                    className={`${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-800 placeholder:text-gray-300 focus:ring-blue-sky focus:border-blue-sky'} transition-all ${disabledInput && 'opacity-80 bg-gray-200 cursor-not-allowed'} block w-full ${leftIcon ? 'pl-10' : 'pl-4'} ${rightIcon ? 'pr-10' : 'pr-4'} sm:text-sm rounded-md`}
                    placeholder={placeholder}
                    readOnly={disabledInput}
                    disabled={disabledInput}
                    {...rest}
                />
                {rightIcon ? (
                    <div onClick={() => rightIconAction && rightIconAction()} className={`${rightIconAction ? 'cursor-pointer' : ''} absolute inset-y-0 max-w-[1.25rem] right-0 mr-3 flex items-center overflow-hidden`}>
                        {rightIcon}
                    </div>
                ) : (
                    <Transition
                        show={error != null}
                        enter="transition-all ease-in"
                        enterFrom="opacity-0 scale-0"
                        enterTo="opacity-100 scale-100"
                        leave="transition-all ease-out"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-0"
                        className="absolute inset-y-0 right-0 mr-3 flex items-center">
                        <ExclamationCircleIcon className='w-4 h-4 text-red-500' />
                    </Transition>
                )}
            </div>
            <Transition
                show={error != null}
                enter="transition-all ease-in"
                enterFrom="max-h-0 opacity-0"
                enterTo="max-h-[3rem] opacity-100"
                leave="transition-all ease-out"
                leaveFrom="max-h-[3rem] opacity-100"
                leaveTo="max-h-0 opacity-0">
                <span className='text-sm text-red-600'>{error}</span>
            </Transition>
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    labelDescription: PropTypes.string,
    needed: PropTypes.bool,
    info: PropTypes.string,
    leftIcon: PropTypes.element,
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    rightIcon: PropTypes.element,
    rightIconAction: PropTypes.func,
    error: PropTypes.string,
    disabledInput: PropTypes.bool
}

Input.defaultProps = {
    needed: false,
    type: 'text',
    disabledInput: false
}

export default Input;