function disableZoom() {
    document.addEventListener('touchmove', function(event) {
        if (event.scale !== undefined && event.scale !== 1) {
            event.preventDefault();
        }
    }, { passive: false });

    window.addEventListener('wheel', function(event) {
        if (event.ctrlKey) {  // Detects if zoom is attempted with Ctrl key
            event.preventDefault();
        }
    }, { passive: false });
    
    window.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '0')) {
            event.preventDefault();
        }
    });
}

export { disableZoom };