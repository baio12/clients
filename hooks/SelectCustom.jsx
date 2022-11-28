import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Transition, Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function SelectCustom({ value, setValue, listOptions, label, isDisabled, needed, error, ...rest }) {
    return (
        <>
            <div>
                <Listbox value={value} onChange={setValue} className='mt-0' disabled={isDisabled} {...rest}>
                    {({ open }) => (
                        <>
                            <Listbox.Label className="block text-sm font-medium text-gray-700">{label} {needed && <span className='text-red-400'>*</span>}</Listbox.Label>
                            <div className="mt-1 relative">
                                <Listbox.Button className={`bg-white relative ${isDisabled ? 'opacity-50 cursor-not-allowed' : error != null ? 'opacity-100 border-red-300 placeholder-red-300' : 'opacity-100 border-gray-300 placeholder:text-gray-300'} w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer outline-none focus:ring-0 sm:text-sm`}>
                                    {!value || value === '' ?
                                        <p className='text-gray-300 text-sm'>Selecciona una opción</p>
                                        :
                                        <span className="block truncate text-gray-900">{value}</span>
                                    }
                                    {!isDisabled && <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>}
                                </Listbox.Button>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute overflow-auto z-10 mt-1 w-full bg-white shadow-lg max-h-40 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {listOptions && listOptions.map((person, i) => (
                                            <Listbox.Option
                                                key={i}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'text-white bg-orange' : 'text-gray-900',
                                                        'cursor-pointer select-none relative py-2 pl-3 pr-9 rounded-md'
                                                    )
                                                }
                                                value={person.name || person.descripcion}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={`${selected && !active && 'text-orange'} block font-normal`}>
                                                            {person.name || person.descripcion}
                                                        </span>

                                                        {selected ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? 'text-white' : 'text-orange',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </>
                    )}
                </Listbox>
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
        </>
    )
}

SelectCustom.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    listOptions: PropTypes.array,
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    needed: PropTypes.bool,
    error: PropTypes.string
}

SelectCustom.defaultValue = {
    isDisabled: false,
    needed: true
}

export default SelectCustom