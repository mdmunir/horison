import base, {horner} from 'astronomia/src/base';
import eclipse from 'astronomia/src/eclipse';
import coord from 'astronomia/src/coord';
import nutation from 'astronomia/src/nutation';
import sidereal from 'astronomia/src/sidereal';
import interpolation from 'astronomia/src/interpolation';
import iterate from 'astronomia/src/iterate';
import solar from 'astronomia/src/solar';
import deltat from 'astronomia/src/deltat';

import {earth} from './solar';
import {elpMoon} from './moon';

const {sin, cos, tan, atan2, atan, asin, PI, floor, hypot} = Math;


const EARTH_RADIUS = 6378;
const SUN_RADIUS = 109.125;
const k1 = 0.272488;
const k2 = 0.272281;

/**
 * 
 * @param {type} sun
 * @param {type} moon
 * @param {type} gst
 * @returns {calcBessel.solar-eclipseAnonym$0}
 */
export function calcBessel(sun, moon, gst) {
    const [sinSa, cosSa] = base.sincos(sun.ra);
    const [sinSd, cosSd] = base.sincos(sun.dec);
    const [sinMa, cosMa] = base.sincos(moon.ra);
    const [sinMd, cosMd] = base.sincos(moon.dec);

    const [sr, mr] = [sun.range / EARTH_RADIUS, moon.range / EARTH_RADIUS];
    const b = mr / sr;

    const ra = atan2(cosSd * sinSa - b * cosMd * sinMa, cosSa * cosSd - b * cosMa * cosMd);
    const d = atan((sin(ra) * (sinSd - b * sinMd)) / (cosSd * sinSa - b * cosMd * sinMa));
    const g = (sinSd - b * sinMd) / sin(d) * sr;

    const [sind, cosd] = base.sincos(d);
    const [sina, cosa] = base.sincos(moon.ra - ra);

    const x = mr * (cosMd * sina);
    const y = mr * (sinMd * cosd - cosMd * sind * cosa);
    const z = mr * (sinMd * sind + cosMd * cosd * cosa);

    const f1 = asin((SUN_RADIUS + k1) / g);
    const f2 = asin((SUN_RADIUS - k2) / g);

    const c1 = z + k1 / sin(f1);
    const c2 = z - k2 / sin(f2);

    const l1 = c1 * tan(f1);
    const l2 = c2 * tan(f2);

    return {
        x, y,
        d, μ: base.pmod(gst - ra, 2 * Math.PI),
        l1, l2,
        tanF1: tan(f1), tanF2: tan(f2),
    }
}

/**
 * @private
 */
function sunPos(earth, jde, Δψ, ε) {
    const pos = solar.trueVSOP87(earth, jde);
    pos.lon -= 20.4898 / 3600 * Math.PI / 180 / pos.range;
    pos.lon += Δψ;

    const {ra, dec} = new coord.Ecliptic(pos).toEquatorial(ε);
    return {ra, dec, range: pos.range * base.AU};
}

/**
 * @private
 */
function moonPos(elpMoon, jde, Δψ, ε) {
    const τ = elpMoon.lightTime(jde);
    const pos = elpMoon.position(jde - τ);
    // precession correction
    const T = base.J2000Century(jde);
//    let pA = 0.29965 * T / 3600 * Math.PI / 180;
//    pos.lon += pA;

    pos.lon += Δψ;
    const {ra, dec} = new coord.Ecliptic(pos).toEquatorial(ε);
    return {ra, dec, range: pos.range};
}

/**
 * 
 * @param {type} y
 * @param {type} earth
 * @param {type} elpMoon
 * @returns {generateBesselianElement.solar-eclipseAnonym$1|generateBesselianElement.result}
 */
export function generateBesselianElement(y, earth, elpMoon) {
    let info = eclipse.solar(y);
    if (info.type == 0) {
        return {type: 0};
    }

    let jdeMax = info.jdeMax;
    const [i, f] = base.modf(jdeMax + 0.5);
    const result = {
        type: info.type,
        deltaT: deltat.deltaT(y),
        T0: floor(f * 24 + 0.5),
    }
    result.JDE0 = i + result.T0 / 24 - 0.5;
    result.GST0 = sidereal.mean(result.JDE0);

    const prev = {μ: 0, SRa: 0, MRa: 0};
    const series = {
        x: [],
        y: [],
        μ: [],
        d: [],
        l1: [],
        l2: []
    }
    const sunSeries = {ra: [], dec: [], range: []};
    const moonSeries = {ra: [], dec: [], range: []};

    let name, j;
    for (j = 0; j < 5; j++) {
        const h = j * 1.5 - 3;
        const jde = result.JDE0 + h / 24;
        const [Δψ, Δε] = nutation.nutation(jde);
        const ε = nutation.meanObliquity(jde) + Δε;

        let sun = sunPos(earth, jde, Δψ, ε);
        let moon = moonPos(elpMoon, jde, Δψ, ε);

        let gst = (result.GST0 + h * 1.00273790935 * 3600) / 86400 * 2 * PI;
        gst = base.pmod(gst + Δψ * cos(ε), 2 * PI);

        const element = calcBessel(sun, moon, gst);

        while (element.μ < prev.M) {
            element.μ += 2 * PI;
        }
        prev.μ = element.μ;
        while (sun.ra < prev.SRa) {
            sun.ra += 2 * PI;
        }
        prev.SRa = sun.ra;
        while (moon.ra < prev.MRa) {
            moon.ra += 2 * PI;
        }
        prev.MRa = moon.ra;

        for (name in series) {
            series[name].push([h, element[name]]);
        }
        for (name in sunSeries) {
            sunSeries[name].push([h, sun[name]]);
        }
        for (name in moonSeries) {
            moonSeries[name].push([h, moon[name]]);
        }

        if (j == 2) {
            result.tanF1 = element.tanF1;
            result.tanF2 = element.tanF2;
        }
    }
    for (name in series) {
        result[name] = interpolation.lagrangePoly(series[name]);
    }
    result.sun = {};
    result.moon = {};
    for (name in sunSeries) {
        result.sun[name] = interpolation.lagrangePoly(sunSeries[name]);
    }
    for (name in moonSeries) {
        result.moon[name] = interpolation.lagrangePoly(moonSeries[name]);
    }
    // calculate jdeMax
    const diffX = result.x.map((v, i) => i * v).slice(1);
    const diffY = result.y.map((v, i) => i * v).slice(1);

    function diff(t) {
        return base.horner(t, result.x) * base.horner(t, diffX) +
            base.horner(t, result.y) * base.horner(t, diffY);
    }

    let tMax = iterate.binaryRoot(diff, -3, 3);
    result.jdeMax = result.JDE0 + tMax / 24;

    return result;
}

const caches = {}
const DATE_REGEX = /\d{4}-\d{2}-\d{2}/
export class Eclipse {
    constructor(date) {
        if (!DATE_REGEX.test(date)) {
            this._info = {type: 0};
            return;
        }
        let jd = date.toJD();
        let y = 2000 + (jd - 2451545.0) / 365.25;
        let k = floor((y - 2000) * 12.3685 + 0.5);
        if (caches[k] && caches[k].date == date) {
            this._info = caches[k];
            return;
        }
        const info = generateBesselianElement(y, earth, elpMoon);
        if (info.type == 0) {
            this._info = {type: 0};
            return;
        } else {
            let sdate = moment(info.jdeMax.toDate()).utc().format('YYYY-MM-DD');
            if (sdate != date) {
                this._info = {type: 0};
                return;
            }
            this._info = caches[k] = info;
        }
        info.date = date;
        let tMax = (info.jdeMax - info.JDE0) * 24;

        // get P1 and P4
        function func(t) {
            let distance = hypot(horner(t, info.x), horner(t, info.y));
            let r = 1 + base.horner(t, info.l1);
            return distance - r;
        }
        info.tMax = tMax;
        info.p1 = iterate.binaryRoot(func, -3, tMax);
        info.p4 = iterate.binaryRoot(func, tMax, 3);
    }

    calc(t) {
        if (this._info.type == 0) {
            return {};
        }
        const info = this._info;
        let names = ['x', 'y', 'μ', 'd', 'l1', 'l2'];
        const result = {
            jde: info.JDE0 + t / 24,
            gst: info.GST0 + (t - info.deltaT / 3600) * 1.00273790935 * (2 * PI / 24),
            tanF1: info.tanF1,
            tanF2: info.tanF2,
            sun: {},
            moon: {},
        };
        names.forEach(name => {
            result[name] = base.horner(t, info[name]);
        });
        names = ['ra', 'dec', 'range'];
        names.forEach(name => {
            result.sun[name] = base.horner(t, info.sun[name]);
            result.moon[name] = base.horner(t, info.moon[name]);
        });

        return result;
    }

    isValid() {
        return this._info.type > 0;
    }

    info() {
        return this._info;
    }
}

export default {
    calcBessel,
    generateBesselianElement,
    Eclipse,
}