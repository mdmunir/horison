/**
 * @copyright 2013 Sonia Keys
 * @copyright 2016 commenthol
 * @license MIT
 * @module extra
 */

import angle from 'astronomia/src/angle'
import base from 'astronomia/src/base'
import coord from 'astronomia/src/coord'
import solar from 'astronomia/src/solar'
import deltat from 'astronomia/src/deltat'
import moonphase from 'astronomia/src/moonphase'
import moonillum from 'astronomia/src/moonillum'
import rise from 'astronomia/src/rise'
import interpolation from 'astronomia/src/interpolation'
import refraction from 'astronomia/src/refraction'
import julian from 'astronomia/src/julian'
import sexa from 'astronomia/src/sexagesimal'
import sidereal from 'astronomia/src/sidereal'
import planetposition from 'astronomia/src/planetposition'
import elp from 'astronomia/src/elp'

import earth from './earth'
import elpMoon from './moon'

const {cos, sin, tan, atan, asin, abs, floor, PI} = Math

export const D2R = PI / 180
export const R2D = 180 / PI
export const SECS_PER_DAY = 86400
export const SEC2RAD = PI / 180 / 3600
export const RAD2SEC = 1 / SEC2RAD

const PI_2 = 2 * PI
const ABERATION = 20.4898 / 3600 * PI / 180
const SUN_H0 = rise.stdh0Solar()
const EARTH_RADIUS = 6378.137 // km
const SECTIME2RAD = PI_2 / 86400
const RAD2SECTIME = 86400 / PI_2

const SUN_RADIUS = 959.63 / 3600 * PI / 180 // 1AU
const MOON_RADIUS = 358473400 / 3600 * Math.PI / 180 // 1KM

const EARTH_FLATTENING = 1 / 298.257 // flattening

const OBLIQUITY_LASKAR = [
    new sexa.Angle(false, 23, 26, 21.448).rad(),
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
]
const OBLIQUITY_LASKAR_DIFF = [-4680.93 * SEC2RAD,
    -3.1 * SEC2RAD,
    5997.75 * SEC2RAD,
    -205.52 * SEC2RAD,
    -1248.35 * SEC2RAD,
    -234.3 * SEC2RAD,
    49.84 * SEC2RAD,
    222.96 * SEC2RAD,
    52.11 * SEC2RAD,
    24.5 * SEC2RAD]

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
        // [-8, 0, 3, 0, 1.52361239766474, 40670.8639399859, 0.0000287, 6.79e-7],
        // [7, 0, -3, 0, 1.29434629618863, 17427.7201807858, -0.0000591, 1.26e-7],
        // [-7, 0, 0, 0, 4.48183063713039, -6585.76091343418, 0.000216, 6.79e-8],
        // [-7, 0, 3, 0, 1.38064514825107, 16171.1162687375, -0.0000535, 2.42e-7],
        // [-7, 0, 3, 0, 3.26881074996523, 32375.9295630396, -0.000159, 3.3e-7],
        // [6, 0, 0, 0, 0.186116675444927, 23871.4457152242, 0.000085, 4.95e-7],
        // [6, 0, -3, 0, 1.93483884750512, 17914.0467781862, 0.000314, 6.21e-7],
        // [6, 0, -3, 0, 3.68003719980556, 9619.11240123995, 0.000126, 2.71e-7],
        // [-6, 0, 3, 0, 1.58509546029063, -1148.38559936123, -0.000334, -3.98e-7],
        // [-6, 0, 3, 0, 0.013006891717527, 15508.9972464046, -0.0000307, 2.23e-7],
        // [5, 0, 0, 0, 2.39869779533447, 7700.38946685874, 0.000155, 3.68e-7],
        // [-5, 0, 3, 0, 1.36763825653347, 662.119022332837, -0.0000228, 1.94e-8],
        // [-5, 0, 3, 0, 4.35187027943423, -15576.5113382779, 0.000103, -1.45e-7],
        // [-5, 0, 3, 0, 3.86615387525051, 33490.5581164642, 0.000211, 7.66e-7],
        // [4, 0, 0, 0, 2.77978171086117, 1080.8715074879, 0.000407, 4.75e-7],
        // [4, 0, 0, 0, 1.28133940447109, 1918.72293438121, -0.0000284, -9.7e-8],
        // [4, 0, 0, 0, 5.38292981823519, -8538.24089375204, 0.00028, 2.04e-7],
        // [-4, 0, 0, 0, 3.44026421623243, 557.314276712283, 0.000185, 2.18e-7],
        // [-4, 0, 0, 0, 2.12628226782713, -14914.4523363171, 0.000064, -2.42e-7],
        // [-4, 0, 0, 0, 5.19846946025042, 7771.37714617064, -0.0000334, 9.21e-8],
        // [3, 0, 0, 0, 5.6113522275509, 25195.6237395179, 0.0000233, 4.17e-7],
        // [-3, 0, 0, 0, 2.90958429079294, 142.035378995794, -0.00036, -4.36e-7],
        // [-3, 0, 0, 0, 3.48341364226363, -70.987679311902, 0.000188, 2.76e-7],
        // [-3, 0, 0, 0, 2.31239894327205, 8956.99337890711, 0.000149, 2.52e-7],
        // [-3, 0, 0, 0, 3.73619351755432, 24499.8076916204, 0.0000983, 5.53e-7],
        // [-3, 0, 0, 0, 3.13885039226906, 23385.1791381958, -0.000272, 1.16e-7],
        // [-3, 0, 0, 0, 2.12095552295003, 41785.4924934104, 0.000399, 0.00000112],
        // [-3, 0, 0, 0, 5.49439876157231, 31713.8705610787, -0.00012, 4.27e-7],
]

const _BULAN = `المحرم
صفر
ربيع الأول
ربيع الثاني
جمادي الأولي
جمادي الأخرة
رجب
شعبان
رمضان
شوال
ذو القعدة
ذو الحجة`

export const NAMA_BULAN = _BULAN.split(/\n/)

export function filterObj(obj, predicate) {
    let func = predicate || function (v) {
        return v;
    }
    return Object.keys(obj)
        .filter(key => func(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});
}

export function now() {
    let date = new Date();
    return {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds() + date.getMilliseconds() / 1000,
    }
}

/**
 * 
 * @param {Number} jde 
 * @returns {Number[]} [ε, Δψ, Δε]
 */
export function obliquity(jde) {
    let JD = floor(jde)
    let T = base.J2000Century(jde)
    const ε0 = base.horner(T / 100, OBLIQUITY_LASKAR)
    if (obliquity.JD == JD) {
        const [Δψ, Δε] = obliquity.val;
        return [ε0 + Δε, Δψ, Δε];
    }
    obliquity.JD = JD;
    T = base.J2000Century(JD + 0.5);
    let Δψ = 0, Δε = 0;
    NUTASI.forEach(row => {
        const [Δψ0, Δψ1, Δε0, Δε1] = row
        const [s, c] = base.sincos(base.horner(T, row.slice(4)))
        Δψ += s * (Δψ0 + Δψ1 * T)
        Δε += c * (Δε0 + Δε1 * T)
    })
    Δψ *= SEC2RAD / 10000
    Δε *= SEC2RAD / 10000

    obliquity.val = [Δψ, Δε]
    return [ε0 + Δε, Δψ, Δε]
}

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

export function deltaTJD(jd) {
    let y = (jd - 2451545.0) / 365.25 + 2000
    return deltaT(y)
}

export function strToJD(str) {
    if (!str) {
        return false;
    }
    str = str.trim();
    let m = str.match(/^JD\s+([\d\.]+)/i);
    if (m && m[1]) {
        return parseFloat(m[1]);
    }
    if (str.match(/^\d{4}-\d{2}-\d{2}$/)) {
        str += ' 00:00:00Z';
    } else if (!str.match(/Z(\+|-)?\d*$/)) {
        str += 'Z';
    }
    try {
        return julian.DateToJD(new Date(str))
    } catch (e) {
        return false
    }
}

export function dateToJD(y, m, d) {
    if (y instanceof Date) {
        return julian.DateToJD(y)
    }
    return julian.CalendarToJD(y, m, d, !julian.isCalendarGregorian(y, m, d))
}

/**
 * JDToDate returns the calendar date for the given jd.
 *
 * Note that this function returns a date in either the Julian or Gregorian
 * Calendar, as appropriate.
 * @param {number} jd - Julian day (float)
 * @returns {object} `{ (int) year, (int) month, (float) day }`
 */
export function JDToDate(jd) {
    return julian.JDToCalendar(jd, jd < 2299160.5);
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

export function calcTimeOffset(timezone) {
    const REGEX = /^(\+|-)?(\d\d)(\d\d)?/
    if (!timezone || !REGEX.test(timezone)) {
        return 0
    }
    let [, s, h, m] = timezone.match(REGEX)
    let result = parseInt(h)
    if (m) {
        result + parseInt(m) / 60
    }
    if (s && s == '-') {
        result *= -1
    }
    return result
}

export function getLocalOffset(g) {
    if (g.timezone) {
        return calcTimeOffset(g.timezone)
    }
    let s = g.lon > 0 ? -1 : 1
    let jam = floor(abs(g.lon) * 12 / PI + 1)
    return base.pmod(12 + s * jam, 24) - 12
}

function elevationAngle(height) {
    return -0.0347 * Math.sqrt(height || 0) * D2R
}

export function toGlobe(c) {
    return {
        ...c,
        lon: -c.lon * D2R,
        lat: c.lat * D2R,
    }
}

export function locToStr(c, isRad) {
    if (isRad) {
        return `${abs(c.lat) * R2D} ${c.lat > 0 ? 'N' : 'S'}, ${abs(c.lon) * R2D} ${c.lon > 0 ? 'W' : 'E'}`;
    } else {
        return `${abs(c.lat)} ${c.lat > 0 ? 'N' : 'S'}, ${abs(c.lon)} ${c.lon < 0 ? 'W' : 'E'}`;
    }
}

export function formatAngle(format, value, fixed, length) {
    let result = '';
    switch (format) {
        case 'dms':
            let neg = value < 0;
            value = abs(value);
            result = `${neg ? '-' : ''}${floor(value)}°`;
            value = (value - floor(value)) * 3600000;
            result += moment(value).format('mm[\']ss.S["]');
            break;

        default:
            result = value.toFixed(fixed === undefined ? 5 : (fixed || 0));
            break;
    }
    return length ? result.padStart(length, ' ') : result;
}

/**
 * 
 * @param {Number} range distance in KM
 * @returns {Number} Semidiameter in rad
 */
export function sunRadius(range) {
    return SUN_RADIUS * base.AU / range
}

/**
 * 
 * @param {Number} range distance in KM
 * @returns {Number} Semidiameter in rad
 */
export function moonRadius(range) {
    return MOON_RADIUS / range
}

/**
 * 
 * @param {Number} jd Julian day
 * @param {Object} g globe coordinat
 */
export function sunPosition(jd, g) {
    let deltaT = deltaTJD(jd)
    let jde = jd + deltaT / SECS_PER_DAY
    let {lon, lat, range} = solar.trueVSOP87(earth, jde)
    let [ε, Δψ, ] = obliquity(jde)
    lon = lon + Δψ + solar.aberration(range)

    range *= base.AU
    let eq = new coord.Ecliptic(lon, lat).toEquatorial(ε)
    let st = GST(jd)
    const result = {
        lon: base.pmod(lon, PI_2), lat,
        ra: eq.ra, dec: eq.dec,
        range,
        gst: st * R2D,
        deltaT,
        sd: sunRadius(range),
        ε
    }
    if (g) {
        let {az, alt} = eq.toHorizontal(g, st * RAD2SECTIME)
        let paralax = asin(EARTH_RADIUS / range)
        alt -= paralax * cos(alt)
        result.alt = alt
        result.az = az
    }
    return result
}

function _moonPosition(jde) {
    let {lon, lat, range} = elpMoon.position(jde - 1.21 / 86400)
    let Δp = -0.29965 * SEC2RAD * base.J2000Century(jde)
    lon += Δp
    return {lon, lat, range}
}

/**
 * 
 * @param {Number} jd Julian day
 * @param {Object} g globe coordinat
 */
export function moonPosition(jd, g) {
    let deltaT = deltaTJD(jd)
    let jde = jd + deltaT / SECS_PER_DAY
    let {lon, lat, range} = _moonPosition(jd)
    let [ε, Δψ, ] = obliquity(jde)
    lon = lon + Δψ

    let eq = new coord.Ecliptic(lon, lat).toEquatorial(ε)
    let st = GST(jd)

    let sunPos = sunPosition(jd);
    let phase = moonillum.phaseAngleEquatorial({range, ...eq}, sunPos);
    let fraction = (1 + cos(phase)) / 2;
    let elongation = angle.sep(sunPos, eq);
    const result = {
        lon: base.pmod(lon, PI_2), lat,
        ra: eq.ra, dec: eq.dec,
        range,
        gst: st * R2D,
        deltaT,
        sd: moonRadius(range),
        ε,
        phase, fraction, elongation,
    }
    if (g) {
        let {az, alt} = eq.toHorizontal(g, st * RAD2SECTIME);
        let paralax = asin(EARTH_RADIUS / range);
        alt -= paralax * cos(alt);
        result.alt = alt;
        result.az = az;
    }
    return result;
}

export class ReducePosition {
    constructor(funcBody, T0, begin, end, NPOLY = 4) {
        const L = [], B = [], R = [];
        let lon0 = 0;
        this.T0 = T0;
        for (let i = 0; i <= NPOLY; i++) {
            let x = (i / NPOLY) * (end - begin) + begin
            let {lon, lat, range} = funcBody(T0 + x)
            while (lon < lon0) {
                lon += PI_2;
            }
            lon0 = lon;
            L.push([x, lon]);
            B.push([x, lat]);
            R.push([x, range]);
        }
        this.L = interpolation.lagrangePoly(L)
        this.B = interpolation.lagrangePoly(B)
        this.R = interpolation.lagrangePoly(R)
    }

    lbr(jde) {
        let x = jde - this.T0
        let lon = base.horner(x, this.L)
        let lat = base.horner(x, this.B)
        let range = base.horner(x, this.R)
        return {lon: base.pmod(lon, PI_2), lat, range}
    }
    position(jd, g) {
        let deltaT = deltaTJD(jd)
        let jde = jd + deltaT / SECS_PER_DAY
        let {lon, lat, range} = this.lbr(jde)

        let [ε, Δψ] = obliquity(jde)
        lon += Δψ
        let eq = new coord.Ecliptic(lon, lat).toEquatorial(ε)
        let st = GST(jd)
        let result = {
            lon, lat,
            ra: eq.ra, dec: eq.dec,
            range,
            deltaT,
            gst: st * R2D,
            ε,
        }
        if (g) {
            let {alt, az} = eq.toHorizontal(g, st * RAD2SECTIME)
            result.alt = alt
            result.az = az
        }
        return result
    }
}

/**
 * 
 * @param {Number} jd0 JD begin
 * @param {Number} jd1 JD end
 * @param {Number} interval interval time (day)
 * @param {Object} g {lon, lat, height}
 */
export function sunList(jd0, jd1, interval, g) {
    const NPOLY = 4
    if (jd1 <= jd0) {
        return []
    }
    interval = abs(interval)
    if (interval < 1 / SECS_PER_DAY)
        interval = 1 / SECS_PER_DAY
    let count = (jd1 - jd0) / interval
    let jd = jd0, deltaT
    const result = []

    let iterate = 0
    if (interval < 1 / (NPOLY + 2) && count > NPOLY + 2) {
        while (jd <= jd1) {
            deltaT = deltaTJD(jd)
            let T0 = jd
            let body = new ReducePosition((jde) => {
                let {lon, lat, range} = solar.trueVSOP87(earth, jde)
                lon += solar.aberration(range)
                return {lon, lat, range: range * base.AU}
            }, T0 + deltaT / SECS_PER_DAY, 0, 1, NPOLY)

            while (jd <= T0 + 1 && jd < jd1) {
                let pos = body.position(jd, g)
                if (g) {
                    let paralax = asin(EARTH_RADIUS / pos.range)
                    pos.alt -= paralax * cos(pos.alt)
                }
                result.push({
                    jd,
                    sd: sunRadius(pos.range),
                    ...pos,
                })
                iterate++
                jd = jd0 + iterate * interval
            }
        }
    } else {
        while (jd <= jd1) {
            let pos = sunPosition(jd, g)
            if (g) {
                let paralax = asin(EARTH_RADIUS / pos.range)
                pos.alt -= paralax * cos(pos.alt)
            }
            result.push({
                jd,
                sd: sunRadius(pos.range),
                ...pos,
            })
            iterate++
            jd = jd0 + iterate * interval
        }
    }
    return result
}

/**
 * 
 * @param {Number} jd0 JD begin
 * @param {Number} jd1 JD end
 * @param {Number} interval interval time (day)
 * @param {Object} g {lon, lat, height}
 */
export function moonList(jd0, jd1, interval, g) {
    const NPOLY = 5
    if (jd1 <= jd0) {
        return []
    }
    interval = abs(interval)
    if (interval < 1 / SECS_PER_DAY)
        interval = 1 / SECS_PER_DAY
    let count = (jd1 - jd0) / interval

    let jd = jd0, deltaT
    const result = []

    let iterate = 0
    if (interval < 1 / (NPOLY + 2) && count > NPOLY + 2) {
        while (jd <= jd1) {
            deltaT = deltaTJD(jd);
            let T0 = jd;
            let body = new ReducePosition((jde) => {
                let {lon, lat, range} = _moonPosition(jde);
                return {lon, lat, range}
            }, T0 + deltaT / SECS_PER_DAY, 0, 1, NPOLY);

            let sunBody = new ReducePosition((jde) => {
                let {lon, lat, range} = sunPosition(jde);
                return {lon, lat, range}
            }, T0 + deltaT / SECS_PER_DAY, 0, 1, NPOLY - 1);

            while (jd <= T0 + 1 && jd <= jd1) {
                let pos = body.position(jd, g);
                let sun = sunBody.position(jd);
                let phase = moonillum.phaseAngleEquatorial(pos, sun);
                let fraction = (1 + cos(phase)) / 2;
                let elongation = angle.sep(sun, pos);
                if (g) {
                    let paralax = asin(EARTH_RADIUS / pos.range);
                    pos.alt -= paralax * cos(pos.alt);
                }
                result.push({
                    jd,
                    sd: moonRadius(pos.range),
                    ...pos,
                    phase, fraction, elongation,
                })
                iterate++
                jd = jd0 + iterate * interval
            }
        }
    } else {
        while (jd <= jd1) {
            let pos = moonPosition(jd, g);
            let sun = sunPosition(jd);
            let phase = moonillum.phaseAngleEquatorial(pos, sun);
            let fraction = (1 + cos(phase)) / 2;
            let elongation = angle.sep(sun, pos);
            if (g) {
                let paralax = asin(EARTH_RADIUS / pos.range);
                pos.alt -= paralax * cos(pos.alt);
            }
            result.push({
                jd,
                sd: moonRadius(pos.range),
                ...pos,
                phase, fraction, elongation,
            });
            iterate++;
            jd = jd0 + iterate * interval;
        }
    }
    return result
}

/**
 * e computes the "equation of time" for the given JDE.
 *
 * Parameter planet must be a planetposition.Planet object for Earth obtained
 * with `new planetposition.Planet('earth')`.
 *
 * @param {Number} jd - Julian day
 * @returns {Number[]} equation of time as an hour angle in radians.
 */
export function eSun(jd) {
    let jde = jd + deltaTJD(jd) / SECS_PER_DAY
    const τ = base.J2000Century(jde) * 0.1
    const L0 = l0(τ)
    // code duplicated from solar.ApparentEquatorialVSOP87 so that
    // we can keep Δψ and cε
    const {lon, lat, range} = solar.trueVSOP87(earth, jde)
    const [ε, Δψ, ] = obliquity(jde)
    const a = solar.aberration(range)
    const λ = lon + Δψ + a
    const eq = new coord.Ecliptic(λ, lat).toEquatorial(ε)
    // (28.1) p. 183
    let E = L0 - 0.0057183 * PI / 180 - eq.ra + Δψ * cos(ε)
    E = base.pmod(E + PI, 2 * PI) - PI
    return [E, eq.dec]
}

export function aproximateHijriah(g, c, date) {
    date = date || new Date()
    let jd = dateToJD(date)
    const kabisat = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29]
    let aritmatika = new HijriahAritmatic(kabisat)
    let [y, m, d] = aritmatika.fromJD(jd)
    let k = 12 * y + m - (d > 15 ? 0 : 1)

    let hijria = new Hijriah()
    let result = hijria.calc(g, c, k, k + 1)
    return (jd < result[1].jd) ? result[0] : result[1]
}

export class Rise {
    constructor(bodyFunc) {
        this.bodyFunc = bodyFunc
    }

    _calcH0(jd, g, h0, sign) {
        let th0 = GST(jd)
        let {ra, dec} = this.bodyFunc(jd)
        let H0 = sign * rise.hourAngle(g.lat, h0, dec)
        let H = base.pmod(th0 - g.lon - ra + PI, PI_2) - PI
        let ΔH = H0 - H
        let Δjd = ΔH / PI_2
        return Δjd
    }

    /**
     * @param {Number} jd julian day
     * @param {Object} g 
     *   {Number} lon geographic longitude.
     *   {Number} lat geographic latitude.
     * @param {Number} h0  Altitude of body
     * @returns {Number} time set
     */
    calcH0(jd, g, h0, sign) {
        let Δjd;
        for (let i = 0; i < 10; i++) {
            Δjd = this._calcH0(jd, g, h0, sign)
            if (i == 0 && Δjd < 0) {
                Δjd += 1
            }
            jd += Δjd
            if (abs(Δjd) < 1e-6)
                break
        }
        return jd
    }

    /**
     * @param {Number} jd julian day
     * @param {Object} g 
     *   {Number} lon geographic longitude.
     *   {Number} lat geographic latitude.
     * @param {Number} H0  Hour Angle to calculate
     * @returns {Number} time set
     */
    calcHA(jd, g, H0) {
        H0 = base.pmod(H0 + PI, PI_2) - PI
        let Δjd
        for (let i = 0; i < 10; i++) {
            let th0 = GST(jd)
            let {ra} = this.bodyFunc(jd)
            let H = base.pmod(th0 - g.lon - ra + PI, PI_2) - PI
            let ΔH = H0 - H
            Δjd = ΔH / PI_2
            if (i == 0 && Δjd < 0) {
                Δjd += 1
            }
            jd += Δjd
            if (abs(Δjd) < 1e-6)
                break
        }
        return jd
    }

}

export class Hilal {
    /**
     * 
     * @param {Number} y 
     * @param {Number} m 
     */
    constructor(y, m) {
        const NPOLY = 6
        const BEGIN = -15 / 24
        const END = 48 / 24
        let k = 12 * y + m - 17050

        this.y = k / 12.3685 + 2000
        this.deltaT = deltaT(this.y)

        let jde = moonphase.newMoon(this.y)
        this.meeus = jde
        this.T0 = floor(jde + 0.5)

        this.sunBody = new ReducePosition((jde) => {
            let {lon, lat, range} = solar.trueVSOP87(earth, jde)
            lon += solar.aberration(range)
            range *= base.AU
            return {lon, lat, range}
        }, this.T0, BEGIN, END, NPOLY)

        this.moonBody = new ReducePosition((jde) => {
            let {lon, lat, range} = _moonPosition(jde)
            return {lon, lat, range}
        }, this.T0, BEGIN, END, NPOLY)

        // conjuntion
        const _lon = this.sunBody.L.map((s, i) => this.moonBody.L[i] - s)
        this.dL = _lon[1]
        const fLon = (t) => {
            return base.pmod(base.horner(t, _lon) + PI, PI_2) - PI
        }
        let t = 0
        for (let i = 0;
        i <= 20; i++) {
            let s = -fLon(t) / this.dL
            t += s
            if (abs(s) < 1e-6) {
                break
            }
        }
        this.conjuntion = t + this.T0
    }

    equatorConjuntion() {
        if (this._equatorConjuntion) {
            return this._equatorConjuntion
        }
        const fRa = (t) => {
            let s = this.sunBody.position(t + this.T0)
            let m = this.moonBody.position(t + this.T0)
            return base.pmod(m.ra - s.ra + PI, PI_2) - PI
        }
        let t = 0
        for (let i = 0; i < 20; i++) {
            let s = -fRa(t) / this.dL
            t += s
            if (abs(s) < 1e-6) {
                break
            }
        }
        return this._equatorConjuntion = this.T0 + t
    }

    /**
     * Sun position
     * @param {Number} jd 
     * @param {Number} g Geographic 
     * @returns {Object}
     *  {Number} lon longitude radians.
     *  {Number} lat latitude radians.
     *  {Number} ra right ascension radians.
     *  {Number} dec declination radians.
     *  {Number} range distance km.
     *  {Number} paralax horizontal paralax.
     *  {Number} h0 refraction
     * 
     */
    sunPos(jd, g) {
        let pos = this.sunBody.position(jd, g)
        let paralax = asin(EARTH_RADIUS / pos.range)
        return {...pos, paralax, h0: SUN_H0}
    }

    /**
     * Moon position
     * @param {Number} jd 
     * @param {Number} g Geographic 
     * @returns {Object}
     *  {Number} lon longitude radians.
     *  {Number} lat latitude radians.
     *  {Number} ra right ascension radians.
     *  {Number} dec declination radians.
     *  {Number} range distance km.
     *  {Number} paralax horizontal paralax.
     *  {Number} h0 refraction
     * 
     */
    moonPos(jd, g) {
        let pos = this.moonBody.position(jd, g)
        let paralax = asin(EARTH_RADIUS / pos.range)
        return {...pos, paralax, h0: rise.stdh0Lunar(paralax)}
    }

    _calcSet(jd, g, fbody) {
        let th0 = GST(jd)
        let {ra, dec, h0} = this[fbody](jd)
        if (g.height) {
            h0 += elevationAngle(g.height)
        }
        let H0 = rise.hourAngle(g.lat, h0, dec)
        let H = base.pmod(th0 - g.lon - ra + PI, PI_2) - PI
        let Δjd = (H0 - H) / PI_2
        return Δjd
    }

    /**
     * 
     * @param {Object} g 
     *   {Number} lon geographic longitude.
     *   {Number} lat geographic latitude.
     * @param {String} fbody  body function
     * @param {Number} jd julian day
     * @returns {Number} time set
     */
    calcSet(g, fbody, jd) {
        let Δjd
        for (let i = 0; i < 8; i++) {
            Δjd = this._calcSet(jd, g, fbody)
            if (i == 0 && Δjd < 0) {
                Δjd += 1
            }
            jd += Δjd
            if (abs(Δjd) < 1e-6)
                break
        }
        return jd
    }

    /**
     * 
     * @param {Object} g globe coordinate
     * @param {day} day 
     */
    calc(g, day = 0) {
        let timeOffset = getLocalOffset(g) / 24
        let jd = floor(this.T0 + day) - timeOffset
        let sunSet = this.calcSet(g, 'sunPos', jd)
        let sunPos = this.sunPos(sunSet, g)
        let moonPos = this.moonPos(sunSet, g)
        sunPos.alt -= sunPos.paralax * cos(sunPos.alt)
        sunPos.alt += refraction.saemundsson(sunPos.alt)
        moonPos.alt -= moonPos.paralax * cos(moonPos.alt)
        moonPos.alt += refraction.saemundsson(moonPos.alt)

        let elongation = angle.sep(sunPos, moonPos)
        let i = moonillum.phaseAngleEquatorial(moonPos, sunPos)
        let k = (1 + cos(i)) / 2
        let dT = this.deltaT / SECS_PER_DAY
        return {
            deltaT: this.deltaT,
            meeus: this.meeus - dT,
            conjuntion: this.conjuntion - dT,
            sunSet,
            sunPos,
            moonPos,
            elongation,
            alt: moonPos.alt,
            i,
            k,
            age: sunSet - (this.conjuntion - dT),
    }
    }
}

export class Hijriah {
    /**
     * 
     * @param {Object} g geograpic coordinat
     * @param {Object} c Correction
     *  {Number} age jam
     *  {Number} alt Degress
     *  {Number} elongation Degress
     * @param {*} k1 lunation = 12*y1 + m1
     * @param {*} k2  lunation = 12*y2 + m2
     */
    calc(g, c, k1, k2) {
        const criteria = {}
        const timeOffset = getLocalOffset(g) / 24

        criteria.age = (c && c.age && c.age > 0) ? c.age / 24 : 0
        criteria.alt = (c && c.alt && c.alt > 0) ? c.alt * D2R : 0
        criteria.elongation = (c && c.elongation && c.elongation > 0) ? c.elongation * D2R : 0

        if (!k2 || k2 <= k1) {
            k2 = k1 + 1
        } else {
            k2++
        }

        let hilal, info, result = new Array(k2 - k1), lastNewMoonJD
        let y = floor((k2 - 1) / 12)
        let m = (k2 - 1) % 12 + 1
        hilal = new Hilal(y, m)
        info = hilal.calc(g)
        lastNewMoonJD = info.sunSet
        if (!this._isNewMoon(info, criteria)) {
            lastNewMoonJD += 1
        }

        for (let k = k2 - 1;
        k >= k1; k--) {
            y = floor((k - 1) / 12)
            m = (k - 1) % 12 + 1
            hilal = new Hilal(y, m)
            info = hilal.calc(g)

            let newMoonJD = info.sunSet
            if (!this._isNewMoon(info, criteria)) {
                newMoonJD += 1
            }
            let days = floor(lastNewMoonJD - newMoonJD + 0.5)
            lastNewMoonJD = newMoonJD
            result[k - k1] = {
                y, m, jd: newMoonJD, days, info,
                jd0: floor(newMoonJD + timeOffset),
            }
        }
        return result
    }

    _isNewMoon(info, criteria) {
        return info.age > criteria.age
            && info.alt > criteria.alt
            && info.elongation > criteria.elongation
    }
}

export class HijriahAritmatic {
    constructor(kabisat, koreksi) {
        this.JD0 = 1948438 + (koreksi || 0)
        let years = [], c = 0
        for (let i = 0;
        i < 30; i++) {
            years[i] = {day: c, isLeap: (kabisat.indexOf(i + 1) >= 0)}
            c += years[i].isLeap ? 355 : 354
        }
        if (c !== 10631) {
            throw `List kabisat [${kabisat.join(',')} = ${c} hari] tidak valid. Jumlah hari dalam 30 tahun tidak sama dengan 10631`
        }
        this.years = years
    }

    toJD(y, m = 1, d = 1) {
        let y30 = floor((y - 1) / 30)
        let jd = y30 * 10631
        y = y - y30 * 30
        jd += this.years[y - 1].day
        return this.JD0 + jd + 30 * (m - 1) - (floor((m - 1) / 2)) + d;
    }

    fromJD(jd) {
        let day = floor(jd) - this.JD0
        if (day < 0) {
            return false;
        }
        let y = floor((day - 1) / 10631) * 30
        day -= (y / 30) * 10631;
        let i;
        for (i = 1; i < 30; i++) {
            if (day < this.years[i].day) {
                y += i
                day -= this.years[i - 1].day
                break
            }
        }
        let m = floor((day - 1) / 59) * 2
        day = day - (m * 29.5)
        if (day > 30) {
            day -= 30
            m++
        }
        return [y, m + 1, day]
    }

    calc(k1, k2) {
        let k, result = [];
        if (!k2 || k2 < k1) {
            k2 = k1;
        }
        for (k = k1; k <= k2; k++) {
            let y = floor((k - 1) / 12)
            let m = (k - 1) % 12 + 1
            let jd = this.toJD(y, m, 1)
            let count = 29 + m % 2
            let y30 = (y - 1) % 30
            if (this.years[y30].isLeap && m == 12) {
                count = 30
            }
            result.push({
                y, m, jd, days: count,
                jd0: floor(jd),
            })
        }
        return result
    }
}

/**
 * (28.2) p. 183
 */
const l0 = function (τ) {
    return base.horner(τ, 280.4664567, 360007.6982779, 0.03032028,
        1.0 / 49931, -1.0 / 15300, -1.0 / 2000000) * PI / 180
}

export default {
    now,
    eSun,
    obliquity,
    deltaT,
    deltaTJD,
    calcTimeOffset,
    getLocalOffset,
    dateToJD,
    JDToDate,
    strToJD,
    toGlobe,
    locToStr,
    sunPosition,
    moonPosition,
    sunList,
    moonList,
    Hilal,
    Hijriah,
    HijriahAritmatic,
    Rise,
    ReducePosition,
    NAMA_BULAN,
    D2R,
    R2D,
    SECS_PER_DAY,
    SEC2RAD,
    RAD2SEC,
}
