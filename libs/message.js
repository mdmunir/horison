const {floor, random} = Math;
const myChanel = new BroadcastChannel('my-chanel');
const myId = floor(random() * 1000000);

BroadcastChannel.myListen = function (store) {
    myChanel.addEventListener('message', event => {
        if (event.data && event.data.type == 'STORE_REFRESH' && event.data.id != myId) {
            setTimeout(function () {
                store.commit('location/refresh');
                store.commit('prayer/refresh');
                store.commit('criteria/refresh');
            }, 500);
        }
    });
}

BroadcastChannel.myRefresh = function () {
    myChanel.postMessage({
        type: 'STORE_REFRESH',
        id: myId,
    });
}