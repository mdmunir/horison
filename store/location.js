export const state = () => {
    return JSON.parse(localStorage.getItem('horison/location')) || {
        id:0,
        name: '',
        lat: -6,
        lon: 112,
        timezone: 'Asia/Jakarta',
        offset:420,
        height: 10,
    }
}

export const mutations = {
    change(state, loc) {
        Object.assign(state, loc);
        localStorage.setItem('horison/location', JSON.stringify(state));
    }
}