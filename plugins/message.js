const {floor, random} = Math;
const myChanel = new BroadcastChannel('my-chanel');
const MY_ID = floor(random() * 1000000);

BroadcastChannel.refreshState = function (name, state) {
    myChanel.postMessage({
        type: 'STORE_REFRESH',
        name, state,
        id: MY_ID,
    });
}

export default function ( {store}) {
    myChanel.addEventListener('message', ({data}) => {        
        if (data && data.type == 'STORE_REFRESH' && data.id != MY_ID) {
            store.commit(data.name, data.state);
        }
    });
    
    
}