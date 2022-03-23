export const state = () => {
    return Object.assign({
        id: 163,
        name: '',
        lat: -6.170167,
        lon: 106.831,
        timezone: 'Asia/Jakarta',
        offset: 420,
        height: 10,
    }, JSON.parse(localStorage.getItem('horison/location')) || {});
}

export const mutations = {
    change(state, loc) {
        Object.assign(state, loc);
        localStorage.setItem('horison/location', JSON.stringify(state));

        BroadcastChannel.refreshState('location/refresh', loc);
    },
    refresh(state, config) {
        Object.assign(state, config);
    }
}