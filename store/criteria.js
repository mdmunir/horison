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

        BroadcastChannel.myRefresh();
    },
    refresh(state) {
        Object.assign(state, JSON.parse(localStorage.getItem('horison/criteria')) || {});
    }
}