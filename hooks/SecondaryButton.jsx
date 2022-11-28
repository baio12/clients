import React from 'react';
import PropTypes from 'prop-types';

function SecondaryButton({ isFullWidth, disabled, children, ...rest }) {
    return (
        <button {...rest}
            disabled={disabled}
            className={`${isFullWidth && 'w-full'} ${disabled ? 'bg-gray-50 border-gray-300 text-gray-300' : 'bg-white  hover:bg-gray-50 text-gray-500 border-gray-300'} transition-all inline-flex items-center justify-center px-4 py-2 border shadow-sm text-base font-medium rounded-md`}>
            {children}
        </button>
    )
}

SecondaryButton.propTypes = {
    isFullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ])
}

SecondaryButton.defaultProps = {
    isFullWidth: false,
    disabled: false
}

export default SecondaryButton;