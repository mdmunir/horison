const J2000 = 2451545.0
const D2000 = 2451545.0 - 10957.5;

const {sin, cos, acos, tan, atan, abs, sqrt, PI} = Math;
const D2R = PI / 180;
const R2D = 180 / PI;
const MAX_IT = 3;

function SIND(x) {
    return sin(x * D2R);
}

function COSD(x) {
    return cos(x * D2R);
}

function pmod(x, y) {
    let r = x % y
    if (r < 0) {
        r += y
    }
    return r
}

function calcDec(JD) {
    const T = 2 * PI * (JD - J2000) / 365.25;
    let dec = 0.37877 + 23.264 * SIND(57.297 * T - 79.547)
        + 0.3812 * SIND(2 * 57.297 * T - 82.682)
        + 0.17132 * SIND(3 * 57.297 * T - 59.722);
    return dec * D2R;
}

function calcEt(JD) {
    const U = (JD - 2451545) / 36525;
    const L0 = 280.46607 + 36000.7698 * U;

    let ET = -(1789 + 237 * U) * SIND(L0) - (7146 - 62 * U) * COSD(L0)
        + (9934 - 14 * U) * SIND(2 * L0) - (29 + 5 * U) * COSD(2 * L0)
        + (74 + 10 * U) * SIND(3 * L0) + (320 - 4 * U) * COSD(3 * L0)
        - 212 * SIND(4 * L0);
    return ET / 1000;
}

function calcH(JDL, H0, loc, sign) {
    let dec, et, cosHA, jd = JDL;

    for (let i = 0; i < MAX_IT; i++) {
        dec = calcDec(jd);
        et = calcEt(jd);
        cosHA = (sin(H0) - sin(loc.lat * D2R) * sin(dec)) / (cos(loc.lat * D2R) * cos(dec));
        if (cosHA < -1 || cosHA > 1) {
            return false;
        }
        jd = JDL - et / (24 * 60) + sign * acos(cosHA) / (2 * PI);
    }
    return jd;
}

function calcNoon(JDL) {
    let et, jd = JDL;

    for (let i = 0; i < MAX_IT; i++) {
        et = calcEt(jd);
        jd = JDL - et / (24 * 60);
    }    
    return jd;
}

function calcPrayer(y, m, d, loc, c) {
    const config = c || {};
    let JDL = (Date.UTC(y, m - 1, d, 12, 0, 0, 0) / (24 * 3600000) + D2000)
        - loc.lon / 360;

    const list = [];
    let jd, subuh, maghrib, H0, dec;

    // subuh    
    H0 = (config.alt_subuh || -20) * D2R;
    jd = calcH(JDL, H0, loc, -1);
    subuh = jd;
    list.push({name: 'subuh', jd});

    // terbit
    H0 = (-0.833 - 0.0347 * sqrt(loc.height || 0)) * D2R;
    jd = calcH(JDL, H0, loc, -1);
    list.push({name: 'terbit', jd});

    // dhuha    
    H0 = (config.alt_dhuha || 4.5) * D2R;
    jd = calcH(JDL, H0, loc, -1);
    list.push({name: 'dhuha', jd});

    // dzuhur
    jd = calcNoon(JDL);
    list.push({name: 'dzuhur', jd});

    // ashar
    let alt_ashar = c.alt_ashar || 1;
    dec = calcDec(jd); // alt dzuhur  
    H0 = PI / 2 - atan(alt_ashar + abs(tan(dec - loc.lat * D2R)));
    jd = calcH(JDL, H0, loc, 1);
    list.push({name: 'ashar', jd});

    // maghrib
    H0 = (-0.833 - 0.0347 * sqrt(loc.height || 0)) * D2R;
    jd = calcH(JDL, H0, loc, 1);
    list.push({name: 'maghrib', jd});
    maghrib = jd;

    // isya
    H0 = (config.alt_isya || -18) * D2R;
    jd = calcH(JDL, H0, loc, 1);
    list.push({name: 'isya', jd});

    let selisih = pmod(subuh - maghrib, 1);
    jd = maghrib + selisih / 2;
    list.push({name: 'tengah', jd});
    jd = maghrib + 2 * selisih / 3;
    list.push({name: 'pertiga', jd});

    return list.map((row) => {
        if (config[row.name]) {
            row.jd += config[row.name] / (24 * 60);
        }
        row.time = (row.jd - D2000) * (24 * 3600000);
        return row;
    });
}

export default calcPrayer;