// css
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
import 'admin-lte/plugins/select2/css/select2.min.css';
import 'admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css';
import 'admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css';


// script
import 'expose-loader?$!expose-loader?jQuery!jquery';
import 'bootstrap';
import 'admin-lte';
import 'admin-lte/plugins/select2/js/select2.full.min.js';

// momentjs
import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');
window.moment = moment;

sanitizeUrlParam();
swUpdate();



async function swUpdate() {
    const workbox = await window.$workbox;
    if (workbox) {
        workbox.addEventListener('installed', (event) => {
            if (event.isUpdate) {
                window.location.reload();
            }
        });
    }
}

function sanitizeUrlParam() {
    const { origin, search, pathname, hash } = window.location;
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
}