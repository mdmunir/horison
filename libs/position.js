import angle from 'astronomia/src/angle';
import base from 'astronomia/src/base';
import interpolation from 'astronomia/src/interpolation';
import rise from 'astronomia/src/rise';
import {saemundsson} from 'astronomia/src/refraction';

import solar from './solar';
import moon from './moon';
import {obliquity, toEquatorial, toHorizontal, toHorizontal2, deltaTJD, GST} from './horison';

const {cos, sin, tan, atan, atan2, asin, acos, abs, floor, sqrt, PI} = Math;

export const D2R = PI / 180;
export const R2D = 180 / PI;
export const SECS_PER_DAY = 86400;
export const SEC2RAD = PI / 180 / 3600;
export const RAD2SEC = 1 / SEC2RAD;

const PI_2 = 2 * PI;

const EARTH_RADIUS = 6378.137; // km
const SUN_RADIUS = 695991.75; // km
const MOON_RADIUS = 1737.928; // km
const ERR = 1e-6;

export function elevation(height) {
    if (!height) {
        return 0;
    }
    if (height >= 0) {
        return 0.0347 * D2R * sqrt(height);
    } else {
        return -0.0347 * D2R * sqrt(-height);
    }
}

export class Polynom {
    /**
     * 
     * @param {Function} func
     * @param {Number} T0
     * @param {Number} begin
     * @param {Number} end
     * @param {Number} orde
     * @returns {Object}
     */
    constructor(func, T0, begin, end, orde = 4) {
        this.T0 = T0;
        this.RADIUS = func.RADIUS;
        this.func = func;
        this.orde = orde;

        const L = [], B = [], R = [], Ra = [], Dec = [];
        const prev = {lon: 0, ra: 0, ha: 0};

        for (let i = 0; i <= orde; i++) {
            let x = (i / orde) * (end - begin) + begin;
            let jd = T0 + x;
            let jde = jd + deltaTJD(jd) / 86400;
            let {lon, lat, range, ra, dec} = this.origin(jde);

            while (lon < prev.lon) {
                lon += 2 * PI;
            }
            while (ra < prev.ra) {
                ra += 2 * PI;
            }
            prev.lon = lon;
            prev.ra = ra;

            L.push([x, lon]);
            B.push([x, lat]);
            R.push([x, range]);
            Ra.push([x, ra]);
            Dec.push([x, dec]);
        }
        this.POLYNOM = {
            L: interpolation.lagrangePoly(L),
            B: interpolation.lagrangePoly(B),
            R: interpolation.lagrangePoly(R),
            Ra: interpolation.lagrangePoly(Ra),
            Dec: interpolation.lagrangePoly(Dec),
        };

        let GST0 = GST(T0);
        this.POLYNOM.GHA = this.POLYNOM.Ra.map(v => -v);
        this.POLYNOM.GHA[0] = base.pmod(GST0 - this.POLYNOM.Ra[0], PI_2);
        this.POLYNOM.GHA[1] = 1.00273790935 * PI_2 - this.POLYNOM.Ra[1];

        this.testX = [begin, end, orde * 10];
    }

    origin(jde) {
        let {lon, lat, range} = this.func(jde);
        let [ε, Δψ, ] = obliquity(jde);
        lon += Δψ;
        let {ra, dec} = toEquatorial({lon, lat}, ε);

        lon = base.pmod(lon, 2 * PI);
        ra = base.pmod(ra, 2 * PI);
        return {lon, lat, range, ra, dec};
    }

    err() {
        if (this.ERRORS) {
            return {...this.ERRORS};
        }
        const max = {};
        const {POLYNOM, func, T0} = this;

        const [begin, end, count] = this.testX;
        for (let i = 0; i <= count; i++) {
            let x = (i / count) * (end - begin) + begin;
            let jd = T0 + x;
            let jde = jd + deltaTJD(jd) / 86400;
            let {lon, lat, range, ra, dec} = this.origin(jde);
            let gha = GST(jd) - ra;

            let L = base.horner(x, POLYNOM.L);
            let B = base.horner(x, POLYNOM.B);
            let R = base.horner(x, POLYNOM.R);
            let Ra = base.horner(x, POLYNOM.Ra);
            let Dec = base.horner(x, POLYNOM.Dec);
            let GHA = base.horner(x, POLYNOM.GHA);

            const err = {
                lon: abs(base.pmod(lon - L + PI, 2 * PI) - PI),
                ra: abs(base.pmod(ra - Ra + PI, 2 * PI) - PI),
                gha: abs(base.pmod(gha - GHA + PI, 2 * PI) - PI),
                lat: abs(lat - B),
                dec: abs(dec - Dec),
                range: abs(range - R),
            }
            Object.keys(err).forEach(key => {
                let e = err[key];
                if (!max[key] || max[key] < err[key]) {
                    max[key] = err[key];
                }
            });
        }

        this.ERRORS = max;
        return {...this.ERRORS};
    }

    /**
     * 
     * @param {Number} jd
     * @param {Object} g
     * @returns {Object}
     */
    calc(jd, g) {
        const POLYNOM = this.POLYNOM;
        const x = jd - this.T0;
        const result = {
            lon: base.horner(x, POLYNOM.L),
            lat: base.horner(x, POLYNOM.B),
            range: base.horner(x, POLYNOM.R),
            ra: base.horner(x, POLYNOM.Ra),
            dec: base.horner(x, POLYNOM.Dec),
            gha: base.horner(x, POLYNOM.GHA),
        };
        result.lon = base.pmod(result.lon, PI_2);
        result.ra = base.pmod(result.ra, PI_2);
        result.gha = base.pmod(result.gha, PI_2);

        result.deltaT = deltaTJD(jd);
        result.ε = obliquity(jd + result.deltaT / 86400)[0];
        result.gst = GST(jd);

        result.hp = asin(EARTH_RADIUS / result.range);
        if (this.RADIUS) {
            result.sd = this.RADIUS / result.range;
        }
        if (g) {
            result.lha = result.gha - g.lon;
            let {alt, az} = toHorizontal2(result, g);
            alt -= result.hp * cos(alt);
            alt += saemundsson(alt);
            alt += elevation(g.height);

            result.alt = alt;
            result.az = az;
        }
        return result;
    }

    rise(jd, g, alt, sign) {
        let x = jd - this.T0, lha, dec, H0, Δjd;
        const {GHA, Dec} = this.POLYNOM;
        for (let i = 0; i < 10; i++) {
            lha = base.pmod(base.horner(x, GHA) - g.lon + PI, PI_2) - PI;
            dec = base.horner(x, Dec);
            H0 = sign * rise.hourAngle(g.lat, alt, dec);
            Δjd = (H0 - lha) / PI_2;
            if (i == 0 && Δjd < 0) {
                Δjd += 1;
            }
            x += Δjd;
            if (Δjd < ERR) {
                break;
            }
        }
        return x + this.T0;
    }

    noon(jd, g, sign) {
        let x = jd - this.T0, lha, Δjd;
        let HA = sign ? PI : 0;
        const {GHA} = this.POLYNOM;

        for (let i = 0; i < 10; i++) {
            lha = base.pmod(base.horner(x, GHA) - g.lon + HA, PI_2) - PI;
            Δjd = -lha / PI_2;
            if (i == 0 && Δjd < 0) {
                Δjd += 1;
            }
            x += Δjd;
            if (Δjd < ERR) {
                break;
            }
        }

        return x + this.T0;
    }
}

export class Position {
    constructor(func) {
        this.func = func;
        this.RADIUS = func.RADIUS;
        this.orde = 4;
    }

    calc(jd, g) {
        let deltaT = deltaTJD(jd);
        let jde = jd + deltaT / 86400;
        let {lon, lat, range} = this.func(jde);
        let [ε, Δψ] = obliquity(jde);
        lon += Δψ;
        let {ra, dec} = toEquatorial({lon, lat}, ε);
        let gst = GST(jd);
        let gha = gst - ra;

        lon = base.pmod(lon, 2 * PI);
        ra = base.pmod(ra, 2 * PI);
        gha = base.pmod(gha, 2 * PI);

        const result = {lon, lat, range, ra, dec, gha, gst, ε, deltaT};

        result.hp = asin(EARTH_RADIUS / result.range);
        if (this.RADIUS) {
            result.sd = this.RADIUS / result.range;
        }

        if (this.solar) {
            let sun = this.solar.calc(jd);
            result.elongation = angle.sep(sun, result);
            const [sψ, cψ] = base.sincos(result.elongation);
            result.i = atan(sun.range * sψ / (result.range - sun.range * cψ));
            result.fraction = (1 + cos(result.i)) / 2;
            result.phase = base.pmod(result.lon - sun.lon, PI_2);
        }
        if (g) {
            result.lha = result.gha - g.lon;
            let {alt, az} = toHorizontal2(result, g);
            alt -= result.hp * cos(alt);
            alt += saemundsson(alt);
            alt += elevation(g.height);
            result.alt = alt;
            result.az = az;
        }
        return result;
    }

    /**
     * 
     * @param {Number} T0
     * @param {Number} begin
     * @param {Number} end
     * @param {Number} orde
     * @returns {Polynom}
     */
    polynom(T0, begin, end, orde) {
        const result = new Polynom(this.func, T0, begin, end, orde || this.orde);
        result.RADIUS = this.RADIUS;
        return result;
    }

    /**
     * 
     * @param {Number} jd0
     * @param {Number} jd1
     * @param {Number} interval
     * @param {Object} g
     * @returns {Array}
     */
    list(jd0, jd1, interval, g) {
        if (jd1 <= jd0) {
            return [];
        }
        interval = abs(interval);
        if (interval < 1 / SECS_PER_DAY) {
            interval = 1 / SECS_PER_DAY;
        }
        let count = (jd1 - jd0) / interval;
        let jd = jd0, deltaT;
        const result = [];

        let iterate = 0, polynom, sunPoly;
        if (interval < 1 / (this.orde + 2) && count > (this.orde + 2)) {
            // use polynomial
            while (jd <= jd1) {
                let T0 = jd;
                polynom = this.polynom(T0, 0, 1);
                if (this.solar) {
                    sunPoly = this.solar.polynom(T0, 0, 1);
                }
                while ((jd <= T0 + 1) && (jd < jd1)) {
                    let pos = polynom.calc(jd, g);
                    if (sunPoly) {
                        let sun = sunPoly.calc(jd);
                        pos.elongation = angle.sep(sun, pos);
                        const [sψ, cψ] = base.sincos(pos.elongation);
                        let i = atan(sun.range * sψ / (pos.range - sun.range * cψ));
                        if (i < 0) {
                            i += PI;
                        }
                        pos.fraction = (1 + cos(i)) / 2;
                        pos.phase = base.pmod(pos.lon - sun.lon, PI_2);
                    }
                    result.push({jd, ...pos});

                    iterate++;
                    jd = jd0 + iterate * interval;
                }
            }
        } else {
            while (jd <= jd1) {
                let pos = this.calc(jd, g);
                if (this.solar) {
                    let sun = this.solar.calc(jd);
                    pos.elongation = angle.sep(sun, pos);
                    const [sψ, cψ] = base.sincos(pos.elongation);
                    pos.i = atan(sun.range * sψ / (pos.range - sun.range * cψ));
                    pos.fraction = (1 + cos(pos.i)) / 2;
                    pos.phase = base.pmod(pos.lon - sun.lon, PI_2);
                }
                result.push({jd, ...pos});
                iterate++;
                jd = jd0 + iterate * interval;
            }
        }
        return result;
    }
}

export class Solar extends Position {
    constructor(vsop = true, orde = 4) {
        super(vsop ? solar.position : solar.simple);
        this.orde = orde;
        this.RADIUS = SUN_RADIUS;
    }
}

export class Moon extends Position {
    constructor(elp = true, orde = 5) {
        super(elp ? moon.position : moon.meeus);
        this.orde = orde;
        this.RADIUS = MOON_RADIUS;
    }
}

export default {Solar, Moon}