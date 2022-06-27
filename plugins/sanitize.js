const {origin, search, pathname, hash} = window.location;
const allowedParams = [];
if (search) {
    const searchParams = new URLSearchParams(search);
    searchParams.forEach((v, k) => {
        if (allowedParams.indexOf(k) == -1) {
            searchParams.delete(k);
        }
    });
    let q = searchParams.toString();
    let url = `${origin}${pathname}${q ? '?' + q : ''}${hash}`;
    window.location.replace(url);
}