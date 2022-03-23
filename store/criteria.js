export const state = () => {
    return Object.assign({
        alt: 2,
        elongation: 3,
        age: 8,
        method_elongation: 'g',
        method_alt: 'a',
    }, JSON.parse(localStorage.getItem('horison/criteria')) || {});
}

export const mutations = {
    change(state, config) {
        Object.assign(state, config);
        localStorage.setItem('horison/criteria', JSON.stringify(state));

        BroadcastChannel.refreshState('criteria/refresh', config);
    },
    refresh(state, config) {
        Object.assign(state, config);
    }
}