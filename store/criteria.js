export const state = () => {
    return Object.assign({
        alt: 2,
        elongation: 3,
        age: 8,
    }, JSON.parse(localStorage.getItem('horison/criteria')) || {});
}

export const mutations = {
    change(state, config) {
        Object.assign(state, config);
        localStorage.setItem('horison/criteria', JSON.stringify(state));
    }
}