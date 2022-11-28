import React from 'react';
import PropTypes from 'prop-types';

function InputWithLabel({ label, needed, hasLeftLabel, leftLabel, type, name, id, placeholder, hasRightLabel, rightLabel, ...rest }) {
    return (
        <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                {label} {needed && <span className='text-red-400'>*</span>}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                {hasLeftLabel && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">{leftLabel}</span>
                </div>}
                <input
                type={ type }
                name={ name }
                id={ id }
                className={`focus:ring-blue-sky focus:border-blue-sky block w-full ${ hasLeftLabel ? 'pl-7' : 'pl-4' } ${hasRightLabel ? 'pr-12' : 'pl-4'} sm:text-sm border-gray-300 rounded-md text-gray-800 placeholder:text-gray-300`}
                placeholder={ placeholder }
                {...rest}
                />
                {hasRightLabel && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                        { rightLabel }
                    </span>
                </div>}
            </div>
        </div>
    )
}

InputWithLabel.propTypes = {
    label: PropTypes.string,
    needed: PropTypes.bool,
    hasLeftLabel: PropTypes.bool,
    leftLabel: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    hasRightLabel: PropTypes.bool,
    rightLabel: PropTypes.string,
}

InputWithLabel.defaultValue = {
    label: '',
    needed: true,
    hasLeftLabel: false,
    leftLabel: '',
    type: 'text',
    hasRightLabel: false,
    rightLabel: '',
}

export default InputWithLabel