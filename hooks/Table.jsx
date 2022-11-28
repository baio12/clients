import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DotsVerticalIcon, InformationCircleIcon, DocumentDownloadIcon } from '@heroicons/react/solid';
import MenuButton from './MenuButton';
import { formatPeso } from '../util/numberFormatter';
import ReactTooltip from 'react-tooltip';
import SkeletonLoader from './SkeletonLoader';
import PrimaryButton from './PrimaryButton';

function Table({ title, columns, data, isLoadingData, onItemClick, actionItems, isButton, onButtonClick, invoiceActions }) {

    const [showTooltip, setShowTooltip] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [invoiceMenu, setInvoiceMenu] = useState([]);
    useEffect(() => {
        if (actionItems && actionItems.length > 0) {
            setMenuItems(data?.map(item =>
                actionItems.map(actionItem => {
                    return {
                        name: actionItem.name,
                        action: () => actionItem.action(item)
                    }
                })
            ))
        }
    }, [data, actionItems]);

    useEffect(() => {
        if (invoiceActions && invoiceActions.length > 0) {
            setInvoiceMenu(data?.map(item =>
                invoiceActions.map(invoiceItem => {
                    return {
                        name: invoiceItem.name,
                        action: () => invoiceItem.action(item)
                    }
                })
            ))
        }
    }, [data, invoiceActions]);

    return (
        <div className="shadow ring-1 ring-black ring-opacity-5 md:mx-0 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 bg-transparent">
                <thead className="bg-transparent">
                    <tr className='bg-gray-50'>
                        {columns.map((item, i) => (
                            <th key={i} scope="col" className={`${i > 0 ? 'hidden lg:table-cell' : ''} ${(i == 0 && actionItems.length == 0 || onItemClick) ? 'rounded-tr-lg lg:rounded-tr-none' : ''} py-3 pl-4 pr-3 text-left text-xs uppercase font-medium tracking-wide text-gray-500 first:rounded-tl-lg last:rounded-tr-lg`}>
                                {title && i == 0 ? (
                                    <>
                                        <span className='lg:hidden'>{title}</span>
                                        <span className='hidden lg:block'>{item.heading}</span>
                                    </>
                                ) : (
                                    <>{item.heading}</>
                                )}
                            </th>
                        ))}
                        {onItemClick && (!actionItems || actionItems.length == 0) && (
                            <th scope="col" className="lg:hidden relative py-3.5 pl-3 pr-4 first:rounded-tl-lg last:rounded-tr-lg">
                                <span className="sr-only">Acción</span>
                            </th>
                        )}
                        {actionItems.length > 0 && (
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 first:rounded-tl-lg last:rounded-tr-lg">
                                <span className="sr-only">Editar</span>
                            </th>
                        )}
                        {invoiceActions?.length > 0 && (
                            <th scope="col" className="hidden lg:block relative py-3.5 pl-3 pr-4">
                                <span className="sr-only">Descargar</span>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white ">
                    {isLoadingData ? (
                        <>
                            {Array.from({ length: 5 }).map((_, i) =>
                                <TableRowLoading
                                    key={i}
                                    column={columns}
                                    actionItems={actionItems}
                                    isLast={i == data.length - 1} />
                            )}
                        </>

                    ) : (
                        <>
                            {data.map((item, i) => (
                                <TableRow
                                    key={i}
                                    item={item}
                                    column={columns}
                                    onItemClick={onItemClick}
                                    actionItems={menuItems[i]}
                                    isLast={i == data.length - 1}
                                    setShowTooltip={setShowTooltip}
                                    hasButton={isButton}
                                    onButtonClick={onButtonClick}
                                    invoiceActions={invoiceMenu[i]}
                                    />
                            ))}
                        </>
                    )}
                </tbody>
            </table>
            {showTooltip && columns.some(column => column.description != null) &&
                <ReactTooltip
                    id="tooltip"
                    place="top"
                    effect='solid'
                />
            }
        </div>
    )
}

const valueFor = (item, columnItemValue) => {
    let value = item[`${columnItemValue}`];
    if (columnItemValue?.includes(',')) {
        //To concatenate values
        const itemSplit = columnItemValue?.split(',');
        let values = [];
        itemSplit.forEach(key => {
            let val = item[key]
            if (key.includes('.')) {
                //For nested values
                const keySplit = key.split('.');
                val = item[keySplit[0]][keySplit[1]];
            }
            values.push(val);
        });
        value = values.join(' - ');
    } else if (columnItemValue?.includes('.')) {
        //For nested values
        const itemSplit = columnItemValue?.split('.');
        value = item[itemSplit[0]][itemSplit[1]];
    } else if (columnItemValue === 'price') {
        value = formatPeso(value / 100);
    }
    return value;
}

const handleGetInvoice = (e, item, onButtonClick) => {
    e.stopPropagation();
    onButtonClick(item);
}

const TableRow = ({ item, column, onItemClick, actionItems, isLast, setShowTooltip, hasButton, onButtonClick, invoiceActions }) => (
    <tr className={onItemClick && (!actionItems || actionItems.length == 0) && 'hover:bg-gray-50 cursor-pointer transition-all'}>
        {column.map((columnItem, i) => {
            if (i == 0) {
                return (
                    <td key={i} className={`${isLast ? 'first:rounded-bl-lg last:rounded-br-lg' : ''} ${(isLast && actionItems?.length == 0) ? 'rounded-br-lg lg:rounded-br-none' : ''} w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none`}>
                        <div className='w-full h-full flex items-center'>
                            <span className='hidden lg:inline h-full'>{valueFor(item, columnItem.value)}</span>
                            {columnItem.description && (
                                <InformationCircleIcon
                                    className='hidden lg:inline-block ml-2 cursor-pointer w-5 h-5 text-gray-300'
                                    data-for="tooltip"
                                    data-tip={valueFor(item, columnItem.description)}
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => {
                                        setShowTooltip(false);
                                        setTimeout(() => setShowTooltip(true), 50);
                                    }} />
                            )}
                        </div>
                        <dl className="font-normal lg:hidden -mt-2 " onClick={(e) => e.stopPropagation()}>
                            {column.map((columnItem, i) => {
                                return (
                                    <div key={i}>
                                        <dt className='mt-2 text-gray-500'>{columnItem.heading}:</dt>
                                        <dd className="text-gray-900">{valueFor(item, columnItem.mobile_value || columnItem.value)}</dd>
                                    </div>
                                )
                            })}
                        </dl>
                    </td>
                )
            }
            return (
                <td
                    key={i}
                    className={`${isLast ? 'first:rounded-bl-lg last:rounded-br-lg' : ''} hidden py-4 pl-4 pr-3 text-sm text-gray-500 lg:table-cell align-middle`} 
                    onClick={() => {
                        if (onItemClick && (!actionItems || actionItems.length == 0)) onItemClick(item)
                    }}>
                    {valueFor(item, columnItem.value)}
                    {columnItem.description && (
                        <InformationCircleIcon
                            className='hidden lg:inline-block ml-2 cursor-pointer w-5 h-5 text-gray-300'
                            data-for="tooltip"
                            data-tip={valueFor(item, columnItem.description)}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => {
                                setShowTooltip(false);
                                setTimeout(() => setShowTooltip(true), 50);
                            }} />
                    )}
                </td>
            )
        })}
        {onItemClick && (!actionItems || actionItems.length == 0) && (
            <td className={`${isLast ? 'rounded-br-lg relative' : 'sm:pr-6 rounded-lg z-1 flex justify-start sm:justify-end items-start'} lg:hidden pt-4 px-3.5 text-sm font-medium`}>
                {isLast && (<div className='min-w-[1.25rem] h-5' />)}
                <div className={`${isLast ? 'absolute top-4 lg:top-4 right-4 sm:right-0 sm:pr-6 rounded-lg z-1 flex justify-start sm:justify-end items-start' : ''}`}>
                    <MenuButton
                        items={invoiceActions}>
                        <DotsVerticalIcon className="min-w-[1.25rem] h-5 text-gray-400" />
                    </MenuButton>
                </div>
            </td>
        )}
        {hasButton && <td className={`${isLast ? 'rounded-br-lg relative' : 'rounded-lg z-1 flex justify-start sm:justify-end items-start'} hidden lg:table-cell pr-2`}>
            <div>
                <PrimaryButton onClick={(e) => handleGetInvoice(e, item, onButtonClick)}>
                    <DocumentDownloadIcon className='w-5 h-5' />
                </PrimaryButton>
            </div>
        </td>}
        {actionItems?.length > 0 && (
            <td className={`${isLast ? 'rounded-br-lg relative' : 'sm:pr-6 rounded-lg z-1 flex justify-start sm:justify-end items-start'} pt-4 px-3.5 text-sm font-medium`}>
                {isLast && (<div className='min-w-[1.25rem] h-5' />)}
                <div className={`${isLast ? 'absolute top-4 lg:top-4 right-4 sm:right-0 sm:pr-6 rounded-lg z-1 flex justify-start sm:justify-end items-start' : ''}`}>
                    <MenuButton
                        items={actionItems}>
                        <DotsVerticalIcon className="min-w-[1.25rem] h-5 text-gray-400" />
                    </MenuButton>
                </div>
            </td>
        )}
    </tr>
)

const TableRowLoading = ({ column, actionItems, isLast }) => (
    <tr>
        {column.map((_, i) => {
            if (i == 0) {
                return (
                    <td key={i} className={`${isLast ? 'first:rounded-bl-lg last:rounded-br-lg' : ''} ${(isLast && actionItems.length == 0) ? 'rounded-br-lg lg:rounded-br-none' : ''} w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none lg:flex items-center`}>
                        <div className='hidden lg:inline w-full'>
                            <SkeletonLoader />
                        </div>
                        <dl className="font-normal lg:hidden -mt-2 ">
                            {column.map((columnItem, i) => {
                                return (
                                    <div key={i}>
                                        <dt className='mt-2 text-gray-500'>{columnItem.heading}:</dt>
                                        <SkeletonLoader />
                                    </div>
                                )
                            })}
                        </dl>
                    </td>
                )
            }
            return (
                <td
                    key={i}
                    className={`${isLast ? 'first:rounded-bl-lg last:rounded-br-lg' : ''} hidden py-4 pl-4 pr-3 text-sm text-gray-500 lg:table-cell align-middle`}>
                    <SkeletonLoader />
                </td>
            )
        })}
        {actionItems.length > 0 && (
            <td className={`${isLast ? 'rounded-br-lg relative' : 'sm:pr-6 rounded-lg z-1 flex justify-start sm:justify-end items-start'} pt-4 px-3.5 text-sm font-medium`}>
                {isLast && (<div className='min-w-[1.25rem] h-5' />)}
            </td>
        )}
    </tr>
)

Table.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object),
    isLoadingData: PropTypes.bool,
    onItemClick: PropTypes.func,
    actionItems: PropTypes.arrayOf(PropTypes.object),
    isButton: PropTypes.bool,
    onButtonClick: PropTypes.func
}

Table.defaultProps = {
    columns: [],
    data: [],
    isLoadingData: false,
    actionItems: [],
    isButton: false,
}

export default Table;