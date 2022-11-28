const usePagination = () => {
    const paginate = (items, per, pages) => {
        return {
            totalItems: items,
            ...pages && { totalPages: pages },
            pages: Array.from({ length: Math.ceil(items / per) }, (_, i) => ({
                page: i + 1,
                offset: i * per,
                range: [i * per + 1, Math.min((i + 1) * per, items)],
                total: Math.min((i + 1) * per, items) - (i * per)
            }))
        }
    }

    return paginate;
}

export default usePagination;