(async function () {
    const workbox = await window.$workbox;
    if (workbox) {
        workbox.addEventListener('installed', (event) => {
            if (event.isUpdate) {
                window.location.reload();
            }
        });
    }
})();