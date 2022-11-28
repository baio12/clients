import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { InformationCircleIcon } from '@heroicons/react/solid';
import ReactTooltip from 'react-tooltip';
import { createUUID } from './useUUID';

function Tooltip({ title }) {

    const UUIDRef = useRef(createUUID);
    const [showTooltip, setShowTooltip] = useState(true);
    const [id] = useState(`toltip_${UUIDRef.current()}`);

    return (
        <>
            {showTooltip &&
                <ReactTooltip
                    id={id}
                    place="top"
                    effect='solid'/>
            }
            <InformationCircleIcon
                className='cursor-pointer w-5 h-5 text-gray-300'
                data-tip={title}
                data-for={id}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => {
                    setShowTooltip(false);
                    setTimeout(() => setShowTooltip(true), 50);
                }} />
        </>
    )
}

Tooltip.propTypes = {
    title: PropTypes.string
}

export default Tooltip