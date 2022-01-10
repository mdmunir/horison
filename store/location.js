export const state = () => {
    return JSON.parse(localStorage.getItem('horison/location')) || {
        name: '',
        lat: -6,
        lon: 112,
        timezone: 7,
        height: 10,
    }
}

export const mutations = {
    change(state, loc) {
        Object.assign(state, loc);
        localStorage.setItem('horison/location', JSON.stringify(state));
    }
}