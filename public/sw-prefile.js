self.addEventListener('message', (event) => {
    if (event.data && event.data.onItemClick === 'skipWaiting') {
        self.skipWaiting();
    }
});

