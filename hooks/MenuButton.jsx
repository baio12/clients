import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function MenuButton({ items, children }) {

    return (
        <div className="z-20 inline-flex">
            <Menu as="div" className="-ml-px relative block z-1">
                {(() => {
                    if (!children) {
                        return (
                            <Menu.Button className="bg-white outline-none transition-all inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-500 shadow-sm text-base font-medium rounded-md hover:bg-gray-50">
                                <p>Acciones</p>
                            </Menu.Button>
                        )
                    }
                    return (typeof children === 'string' ? (
                        <Menu.Button className="bg-white outline-none transition-all inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-500 shadow-sm text-base font-medium rounded-md hover:bg-gray-50">
                            <p>{children}</p>
                        </Menu.Button>
                    ) : (
                        <Menu.Button className="shadow-none outline-none">
                            {children}
                        </Menu.Button>
                    ))
                })()}
                {items.length > 0 && (
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="w-full origin-top-right z-50 absolute right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1" >
                                {items.map((item, i) => (
                                    <Menu.Item key={i}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => { if (item.action) item.action(item) }}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block p-2 text-sm w-full text-left'
                                                )}>
                                                {item.name}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                )}
            </Menu>
        </div>
    )
}

MenuButton.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
}

MenuButton.defaultProps = {
    items: []
}

export default MenuButton;