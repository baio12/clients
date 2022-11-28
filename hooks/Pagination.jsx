import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import SecondaryButton from './SecondaryButton';

function Pagination({ pages, setCurrentPage, currentPage = 1 }) {

    const pagesToShow = 4;
    const [currentNumberPage, setCurrentNumberPage] = useState(currentPage);
    const [pageItems, setPageItems] = useState([]);

    const previousPage = (page) => {
        if (page > 1) setCurrentNumberPage(page - 1);
    }

    const nextPage = (page) => {
        if (page < pages) setCurrentNumberPage(page + 1);
    }

    useEffect(() => {
        let items = Array.from({ length: pages }, (_, i) => i + 1);
        if (pages > 7) {
            if (currentNumberPage < pagesToShow) {
                items = [...items.slice(0, pagesToShow), '...', pages]
            } else if (currentNumberPage > pages - (pagesToShow - 1)) {
                items = [1, '...', ...items.slice(pages - pagesToShow, pages)]
            } else if (currentNumberPage == pagesToShow) {
                items = [...items.slice(0, pagesToShow + 1), '...', pages]
            } else if (currentNumberPage > pagesToShow && currentNumberPage < pages - (pagesToShow - 1)) {
                const showedPages = items.slice(currentNumberPage - 2, currentNumberPage + 1);
                items = [1, '...', ...showedPages, '...', pages]
            } else if (currentNumberPage == pages - (pagesToShow - 1)) {
                items = [1, '...', ...items.slice(currentNumberPage - 2, items.length)]
            }
        }
        setPageItems(items);
        setCurrentPage && setCurrentPage(currentNumberPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentNumberPage, pages]);

    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex-1 flex justify-between lg:hidden items-center">
                <SecondaryButton
                    disabled={currentNumberPage == 1}
                    type="button"
                    onClick={() => previousPage(currentNumberPage)}>
                    Anterior
                </SecondaryButton>
                <div className='w-28 flex justify-center text-sm text-gray-500'>
                    <span>
                        {currentNumberPage}
                    </span>
                    {pages > 1 && (
                        <>
                            <span className='w-2 ml-2 mr-1'>
                                /
                            </span>
                            <span>
                                {pages}
                            </span>
                        </>
                    )}
                </div>
                <SecondaryButton
                    disabled={currentNumberPage == pages}
                    type="button"
                    onClick={() => nextPage(currentNumberPage)}>
                    Siguiente
                </SecondaryButton>
            </div>
            <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-between">
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {pages > 1 && (
                            <a
                                onClick={() => previousPage(currentNumberPage)}
                                className={`${currentPage == 1 ? '' : 'cursor-pointer hover:bg-gray-50'} transition-all relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500`}>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        )}
                        {pageItems.map((pageNumber, i) => {
                            let pageItemStyle = pageNumber == currentNumberPage ? 'z-10 bg-blue-sky/20 border-blue-sky text-blue-sky' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer';
                            if (pageNumber == '...') pageItemStyle = 'bg-white border-gray-300 text-gray-500';
                            return (
                                <a key={i}
                                    onClick={() => pageNumber != '...' && setCurrentNumberPage(pageNumber)}
                                    className={`${pageItemStyle} select-none transition-all relative inline-flex items-center justify-center w-12 py-2 border text-sm font-medium`}>
                                    {pageNumber}
                                </a>
                            )
                        })}
                        {pages > 1 && (
                            <a
                                onClick={() => nextPage(currentNumberPage)}
                                className={`${currentPage == pages ? '' : 'cursor-pointer hover:bg-gray-50'} transition-all relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500`}>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination;