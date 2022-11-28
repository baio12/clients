const useScrollPosition = () => {
    const setScrollPosition = position => {
        if (position == null) return;
        window.scrollTo({
            top: position,
            behavior: 'auto'
        });
    }
    return setScrollPosition;
}

export default useScrollPosition;