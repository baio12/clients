import React from 'react';
import PropTypes from 'prop-types';

function Button({ isFullWidth, isTransparent, disabled, children, ...rest }) {
    let styles = isTransparent ? 'bg-transparent hover:bg-orange text-orange hover:text-white border-orange' : 'bg-orange hover:bg-hover-orange text-white border-transparent';
    if (disabled){
        styles = isTransparent ? 'border-gray-300 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-300'
    }
    return (
        <button 
            disabled={disabled}
            {...rest}
            className={`${isFullWidth && 'w-full'} ${styles} transition-all inline-flex items-center justify-center px-4 py-2 border shadow-sm text-base font-medium rounded-md`}>
            {children}
        </button>
    )
}

Button.propTypes = {
    isFullWidth: PropTypes.bool,
    isTransparent: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ])
}

Button.defaultProps = {
    isFullWidth: false,
    isTransparent: false,
    disabled: false
}

export default Button;