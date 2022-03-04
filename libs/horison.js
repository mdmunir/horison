import angle from 'astronomia/src/angle';
import base from 'astronomia/src/base';
import coord from 'astronomia/src/coord';
import solar from 'astronomia/src/solar';
import deltat from 'astronomia/src/deltat';
import moonphase from 'astronomia/src/moonphase';
import moonillum from 'astronomia/src/moonillum';
import rise from 'astronomia/src/rise';
import interpolation from 'astronomia/src/interpolation';
import refraction from 'astronomia/src/refraction';
import julian from 'astronomia/src/julian';
import sexa from 'astronomia/src/sexagesimal';
import sidereal from 'astronomia/src/sidereal';
import planetposition from 'astronomia/src/planetposition';
import elp from 'astronomia/src/elp';

const {cos, sin, tan, atan, atan2, asin, acos, abs, floor, PI} = Math;

export const D2R = PI / 180;
export const R2D = 180 / PI;
export const SECS_PER_DAY = 86400;
export const SEC2RAD = PI / 180 / 3600;
export const RAD2SEC = 1 / SEC2RAD;

const PI_2 = 2 * PI;
const ABERATION = 20.4898 / 3600 * PI / 180;
const SUN_H0 = 50 / 60 * D2R;
const EARTH_RADIUS = 6378.137; // km
const SECTIME2RAD = PI_2 / 86400;
const RAD2SECTIME = 86400 / PI_2;
const ERR = 1e-6;

const T0_GREGORIAN = -12219292800000;
const JD0_GREGORIAN = 2299160.5;
const MS_DAY = 86400000;

const SUN_RADIUS = 959.63 / 3600 * PI / 180; // 1AU
const MOON_RADIUS = 358473400 / 3600 * Math.PI / 180; // 1KM

const EARTH_FLATTENING = 1 / 298.257; // flattening

const OBLIQUITY_LASKAR = [
    23.439291111 * D2R,
    -4680.93 * SEC2RAD,
    -1.55 * SEC2RAD,
    1999.25 * SEC2RAD,
    -51.38 * SEC2RAD,
    -249.67 * SEC2RAD,
    -39.05 * SEC2RAD,
    7.12 * SEC2RAD,
    27.87 * SEC2RAD,
    5.79 * SEC2RAD,
    2.45 * SEC2RAD
];

const NUTASI = [
    [-171996, -174.2, 92025, 8.9, 2.1824385855759, -33.7570459366624, 0.0000361, 3.88e-8],
    [-13187, -1.6, 5736, -3.1, 3.5069274160782, 1256.66393242036, 0.0000106, 1.2e-12],
    [-2274, -0.2, 977, -0.5, 1.33749572221986, 16799.4182247616, -0.0000563, 1.84e-7],
    [2062, 0.2, -895, 0.5, 4.3648771711518, -67.5140918733248, 0.0000723, 7.76e-8],
    [1426, -3.4, 54, -0.1, 6.24003588114838, 628.301956024184, -0.0000028, -5.82e-8],
    [712, 0.1, -7, 0, 2.35554836930326, 8328.69142288292, 0.000152, 3.1e-7],
    [-517, 1.2, 224, -0.6, 3.46377799004699, 1884.96588844454, 0.00000776, -5.82e-8],
    [-386, -0.4, 200, 0, 5.43824244382355, 16833.1752706983, -0.0000924, 1.45e-7],
    [-301, 0, 129, -0.1, 3.69304409152311, 25128.1096476446, 0.0000955, 4.95e-7],
    [217, -0.5, -95, 0.3, 3.5500768421094, 628.361976396174, 0.0000134, 5.82e-8],
    [-158, 0, 0, 0, 4.52498006316159, -7214.06286945836, 0.000219, 1.26e-7],
    [129, 0.1, -70, 0, 1.3244888305023, 1290.42097835702, -0.0000256, -3.88e-8],
    [123, 0, -53, 0, 5.26513266009619, 8470.72680187872, -0.000208, -1.26e-7],
    [63, 0, 0, 0, 4.11375361332121, 15542.7542923413, -0.0000668, 1.84e-7],
    [63, 0.1, -33, 0, 4.53798695487916, 8294.93437694626, 0.000188, 3.49e-7],
    [-59, 0, 26, 0, 3.09570096623783, 24013.48109422, -0.000275, 5.82e-8],
    [-58, -0.1, 32, 0, 6.11007552345223, -8362.44846881959, -0.000116, -2.71e-7],
    [-51, 0, 27, 0, 1.51060550594721, 25161.8666935812, 0.0000594, 4.56e-7],
    [48, 0, 0, 0, 0.597343125285266, 1114.62855342457, 0.00037, 4.36e-7],
    [46, 0, -24, 0, 0.727145705217037, 175.792424932456, -0.000396, -4.75e-7],
    [-38, 0, 16, 0, 5.45124933554113, 32342.1725171029, -0.000123, 3.68e-7],
    [-31, 0, 13, 0, 6.04859246082641, 33456.8010705275, 0.000247, 8.05e-7],
    [29, 0, 0, 0, 4.71109673860651, 16657.3828457659, 0.000304, 6.21e-7],
    [29, 0, -12, 0, 5.86247578538146, 9585.35535530328, 0.000162, 3.1e-7],
    [26, 0, 0, 0, 3.25580385824765, 16866.932316635, -0.000129, 1.07e-7],
    [-22, 0, 0, 0, 5.42523555210598, 1324.17802429368, -0.0000617, -7.76e-8],
    [21, 0, -10, 0, 3.08269407452029, 8504.48384781538, -0.000244, -1.65e-7],
    [17, -0.1, 0, 0, 6.19688645511721, 1256.60391204837, -0.0000056, -1.16e-7],
    [16, 0, -8, 0, 3.94064382959391, 7180.3058235217, -0.000182, -8.73e-8],
    [-16, 0.1, 7, 0, 3.42062856401578, 2513.26784446873, 0.00000496, -1.16e-7],
    [-15, 0, 9, 0, 2.13928915954469, 594.544910087522, 0.0000333, -1.94e-8],
    [-13, 0, 7, 0, 0.424233341557907, -7247.81991539502, 0.000255, 1.65e-7],
    [-12, 0, 6, 0, 2.22558801160711, -662.059001960847, 0.0000389, 9.7e-8],
    [11, 0, 0, 0, 1.45529288035886, -209.549470869119, 0.000432, 5.14e-7],
    [-10, 0, 5, 0, 0.913262380661928, 24047.2381401567, -0.000311, 1.94e-8],
    [-8, 0, 3, 0, 1.52361239766474, 40670.8639399859, 0.0000287, 6.79e-7],
    [7, 0, -3, 0, 1.29434629618863, 17427.7201807858, -0.0000591, 1.26e-7],
    [-7, 0, 0, 0, 4.48183063713039, -6585.76091343418, 0.000216, 6.79e-8],
    [-7, 0, 3, 0, 1.38064514825107, 16171.1162687375, -0.0000535, 2.42e-7],
    [-7, 0, 3, 0, 3.26881074996523, 32375.9295630396, -0.000159, 3.3e-7],
    [6, 0, 0, 0, 0.186116675444927, 23871.4457152242, 0.000085, 4.95e-7],
    [6, 0, -3, 0, 1.93483884750512, 17914.0467781862, 0.000314, 6.21e-7],
    [6, 0, -3, 0, 3.68003719980556, 9619.11240123995, 0.000126, 2.71e-7],
    [-6, 0, 3, 0, 1.58509546029063, -1148.38559936123, -0.000334, -3.98e-7],
    [-6, 0, 3, 0, 0.013006891717527, 15508.9972464046, -0.0000307, 2.23e-7],
    [5, 0, 0, 0, 2.39869779533447, 7700.38946685874, 0.000155, 3.68e-7],
    [-5, 0, 3, 0, 1.36763825653347, 662.119022332837, -0.0000228, 1.94e-8],
    [-5, 0, 3, 0, 4.35187027943423, -15576.5113382779, 0.000103, -1.45e-7],
    [-5, 0, 3, 0, 3.86615387525051, 33490.5581164642, 0.000211, 7.66e-7],
    [4, 0, 0, 0, 2.77978171086117, 1080.8715074879, 0.000407, 4.75e-7],
    [4, 0, 0, 0, 1.28133940447109, 1918.72293438121, -0.0000284, -9.7e-8],
    [4, 0, 0, 0, 5.38292981823519, -8538.24089375204, 0.00028, 2.04e-7],
    [-4, 0, 0, 0, 3.44026421623243, 557.314276712283, 0.000185, 2.18e-7],
    [-4, 0, 0, 0, 2.12628226782713, -14914.4523363171, 0.000064, -2.42e-7],
    [-4, 0, 0, 0, 5.19846946025042, 7771.37714617064, -0.0000334, 9.21e-8],
    [3, 0, 0, 0, 5.6113522275509, 25195.6237395179, 0.0000233, 4.17e-7],
    [-3, 0, 0, 0, 2.90958429079294, 142.035378995794, -0.00036, -4.36e-7],
    [-3, 0, 0, 0, 3.48341364226363, -70.987679311902, 0.000188, 2.76e-7],
    [-3, 0, 0, 0, 2.31239894327205, 8956.99337890711, 0.000149, 2.52e-7],
    [-3, 0, 0, 0, 3.73619351755432, 24499.8076916204, 0.0000983, 5.53e-7],
    [-3, 0, 0, 0, 3.13885039226906, 23385.1791381958, -0.000272, 1.16e-7],
    [-3, 0, 0, 0, 2.12095552295003, 41785.4924934104, 0.000399, 0.00000112],
    [-3, 0, 0, 0, 5.49439876157231, 31713.8705610787, -0.00012, 4.27e-7],
];

export function now() {
    let date = new Date();
    return {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds() + date.getMilliseconds() / 1000,
        jd: JD0_GREGORIAN + (date.getTime() - T0_GREGORIAN) / MS_DAY,
    }
}

/**
 * 
 * @param {Number} jde 
 * @returns {Number[]} [ε, Δψ, Δε]
 */
export function obliquity(jde) {
    let T = base.J2000Century(jde);
    const ε0 = base.horner(T / 100, OBLIQUITY_LASKAR);
    const [Δψ, Δε] = nutation(jde);
    return [ε0 + Δε, Δψ, Δε];
}

export function nutation(jde) {
    let T = base.J2000Century(jde);

    let Δψ = 0, Δε = 0;
    for (let i = NUTASI.length - 1; i >= 0; i--) {
        const row = NUTASI[i];
        const [Δψ0, Δψ1, Δε0, Δε1] = row;
        const [s, c] = base.sincos(base.horner(T, row.slice(4)));
        Δψ += s * (Δψ0 + Δψ1 * T);
        Δε += c * (Δε0 + Δε1 * T);
    }

    Δψ *= 0.0001 * SEC2RAD;
    Δε *= 0.0001 * SEC2RAD;
    return [Δψ, Δε];
}

/**
 * 
 * @param {Number} jde 
 * @returns {Number[]} [ε, Δψ, Δε]
 */
export function obliquity2(jde) {
    let JD = floor(jde);
    const X = jde - JD;
    let T = base.J2000Century(jde);
    const ε0 = base.horner(T / 100, OBLIQUITY_LASKAR);
    if (obliquity2.JD == JD) {
        const [a, b, a2, b2] = obliquity2.val;
        const [Δψ, Δε] = [a + X * a2, b + X * b2];
        return [ε0 + Δε, Δψ, Δε];
    }
    obliquity2.JD = JD;
    const [a, b] = nutation(JD);
    let [a2, b2] = nutation(JD + 1);
    a2 -= a;
    b2 -= b;
    obliquity2.val = [a, b, a2, b2];
    const [Δψ, Δε] = [a + X * a2, b + X * b2];
    return [ε0 + Δε, Δψ, Δε];
}

/**
 * 
 * @param {Number} y
 * @returns {Number}
 */
export function deltaT(y) {
    let Y = floor(y)
    y = y - Y
    if (deltaT.Y == Y) {
        return deltaT.a + y * deltaT.b
    }
    deltaT.Y = Y
    deltaT.a = deltat.deltaT(Y)
    deltaT.b = deltat.deltaT(Y + 1) - deltaT.a
    return deltaT.a + y * deltaT.b
}

/**
 * 
 * @param {Number} jd
 * @returns {Number}
 */
export function deltaTJD(jd) {
    let y = (jd - 2451545.0) / 365.25 + 2000
    return deltaT(y)
}

/**
 * 
 * @param {Number} jd 
 * @returns {Number} GST in radians
 */
export function GST(jd) {
    let [JD0, f] = base.modf(jd + 0.5)
    if (GST.JD0 == JD0) {
        return base.pmod(GST.v + f * 1.00273790935 * PI_2, PI_2)
    }
    GST.JD0 = JD0
    let [ε, Δψ, ] = obliquity(jd)
    GST.v = sidereal.mean(JD0 - 0.5) * SECTIME2RAD + Δψ * cos(ε)
    return base.pmod(GST.v + f * 1.00273790935 * PI_2, PI_2)
}

export function toEquatorial(pos, ε) {
    const [εsin, εcos] = base.sincos(ε);
    const [sβ, cβ] = base.sincos(pos.lat);
    const [sλ, cλ] = base.sincos(pos.lon);
    let ra = atan2(sλ * εcos - (sβ / cβ) * εsin, cλ); // (13.3) p. 93
    if (ra < 0) {
        ra += 2 * PI;
    }
    const dec = asin(sβ * εcos + cβ * εsin * sλ); // (13.4) p. 93
    return {ra, dec, range: pos.range};
}

export function toHorizontal(pos, g, st) {
    const H = st - g.lon - pos.ra;
    return toHorizontal2({dec: pos.dec, gha: st - pos.ra}, g);
}

export function toHorizontal2(pos, g) {
    const H = pos.gha - g.lon;
    const [sH, cH] = base.sincos(H);
    const [sφ, cφ] = base.sincos(g.lat);
    const [sδ, cδ] = base.sincos(pos.dec);
    const az = atan2(sH, cH * sφ - (sδ / cδ) * cφ); // (13.5) p. 93
    const alt = asin(sφ * sδ + cφ * cδ * cH); // (13.6) p. 93
    return {alt, az};
}

export class Globe {
    constructor(lon, lat, height) {
        let o = {};
        if(typeof lon === 'object'){
            o = lon;
        }
        this.lon = o.lon || lon;
        this.lat = o.lat || lat;
        this.height = o.height || height || 0;
    }

    toString() {
        let lat = this.lat * R2D;
        let lon = this.lon * R2D;
        return `${abs(lat)} ${lat > 0 ? 'N' : 'S'}, ${abs(lon)} ${lon > 0 ? 'W' : 'E'}`;
    }

    toLoc() {
        return {
            lon: -this.lon * R2D,
            lat: this.lat * R2D,
            height: this.height,
        }
    }

    static fromLoc(loc) {
        return new Globe(-loc.lon * D2R, loc.lat * D2R, loc.height || 0);
    }
}

export default {
    now,
    obliquity,
    deltaT,
    deltaTJD,
    D2R,
    R2D,
    SECS_PER_DAY,
    SEC2RAD,
    RAD2SEC,
    Globe,
}