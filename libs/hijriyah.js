import base from 'astronomia/src/base';
import moonphase from 'astronomia/src/moonphase';
import angle from 'astronomia/src/angle';
import eqtime from 'astronomia/src/eqtime';
import interpolation from 'astronomia/src/interpolation';
import {toHorizontal2, horizontalSep, deltaT} from './horison';
import position from './position';

const {PI, abs, atan, cos, floor, asin} = Math;
const D2R = PI / 180;
const ERR = 1e-6;

const _MONTHS = [
    'Muharram',
    'Shafar',
    'Rabiul Awal',
    'Rabiul Akhir',
    'Jumadil Awal',
    'Jumadil Akhir',
    'Rajab',
    "Sya'ban",
    'Ramadhan',
    'Syawal',
    "Dzulqa'dah",
    'Dzulhijah',
];

export const MONTHS = _MONTHS.map((v, i) => {
    return {id: i + 1, name: v};
});

export function currentMonth() {
    let jd = (new Date).toJD();
    let year = (jd - 2451545.0) / 365.25 + 2000;
    let nm = moonphase.newMoon(year);
    let k = floor((nm - 2451545.0) / 29.53066257024) + 17050 - 1;
    let d = floor(jd - nm + 1);
    if (nm > jd - 0.5) {
        k--;
        d = 30;
    }
    let y = floor(k / 12);
    let m = k % 12;
    return [y, m + 1, d];
}

const hilalCaches = {};

const ORDE = 3;
const solar = new position.Solar(true, ORDE);
const moon = new position.Moon(true, ORDE);
const hilalCaches2 = {};

export class Hilal2 {
    constructor(year, month) {
        year = floor(year);
        month = floor(month);
        let K = 12 * year + month - 17050;
        if (hilalCaches2[K]) {
            this._data = hilalCaches2[K];
            return;
        }
        let y = K / 12.3685 + 2000;
        let delatT = deltaT(y);
        const data = {
            year, month, y,
            deltaT,
            meeus: moonphase.newMoon(y) - delatT / 86400,
            polynoms: {},
        };
        hilalCaches2[K] = this._data = data;

        data.T0 = floor(data.meeus + 0.5);
        const H0 = floor((data.meeus - data.T0) * 24) + data.T0;
        const conjunction = [
            {
                T: H0,
                sun: solar.calc(H0).lon,
                moon: moon.calc(H0).lon,
            },
            {
                T: H0 + 1 / 24,
                sun: solar.calc(H0 + 1 / 24).lon,
                moon: moon.calc(H0 + 1 / 24).lon,
            },
        ]
        data.conjunction = conjunction;
    }

    polynom(day = 0) {
        day = floor(day);
        if (this._data.polynoms[d]) {
            return this._data.polynoms[d];
        }
        const T0 = this._data.T0 + day;

        const BEGIN = -12 / 24;
        const END = 36 / 24;
        const sunPolynom = solar.polynom(T0, BEGIN, END);
        const moonPolynom = moon.polynom(T0, BEGIN, END);

        const result = {
            T0: T0,
            sun: {...sunPolynom.POLYNOM},
            moon: {...moonPolynom.POLYNOM},
            hp: asin(6378.137 / moonPolynom.POLYNOM.R[0]),
        };
        return this._data.polynoms[d] = result;
    }

    /**
     * 
     * @param {Object} g globe coordinate
     * @param {Number} day 
     * @param {Object} method 
     * @return {Object}
     */
    calc(g, day = 0, method) {
        day = floor(day);
        const polynom = this.polynom(day);
        let t = g.lon / (2 * PI), lha, dec, H0, dt, cosHa;
        let alt = -50 / 60 * D2R;
        let valid = true;
        for (let it = 0; it < 3; it++) {
            dec = base.horner(t, polynom.sun.Dec);
            lha = base.pmod(base.horner(t, polynom.sun.GHA) - g.lon, 2 * PI);
            cosHa = (alt - sin(g.lat) * sin(dec)) / (cos(g.lat) * cos(dec));
            if (cosHa > -1 && cosHa < 1) {
                H0 = acos(cosHa);
                dt = (H0 - lha) / (2 * PI);
                if (it == 1) {
                    dt = base.pmod(dt, 1);
                }
                t += dt;
            } else {
                valid = false;
                break;
            }
        }
        if (!valid) {
            return {sunset: -1};
        }
        const sun = {
            lha, dec,
            ...horison.toHorizontal2({gha: lha + g.lon, dec}, g),
        };
        
        const result = {
            sunset: polynom.T0 + t,

        };
        cos(t);
    }

}

export class Hilal {

    /**
     * 
     * @param {Number} y 
     * @param {Number} m 
     */
    static create(y, m) {
        let k = 12 * y + m - 17050;
        if (hilalCaches[k]) {
            return hilalCaches[k];
        }
        return hilalCaches[k] = new Hilal(y, m)
    }
    /**
     * 
     * @param {Number} y 
     * @param {Number} m 
     */
    constructor(y, m) {
        this.k = 12 * y + m - 17050;

        this.y = this.k / 12.3685 + 2000;
        this.deltaT = deltaT(this.y);

        let jde = moonphase.newMoon(this.y);
        this.meeusConjunction = jde - this.deltaT / 86400;
        this.T0 = floor(jde + 0.5);
        let jam = floor((jde - this.T0) * 24) / 24;
        this.H0 = this.T0 + jam;

        const BEGIN = -0.5;
        const END = 2.5;
        this.begin = BEGIN + this.T0;
        this.end = END + this.T0;

        const solar = new position.Solar(true, 4);
        const moon = new position.Moon(true, 4);

        this.sunPolynom = solar.polynom(this.T0, BEGIN, END);
        this.moonPolynom = moon.polynom(this.T0, BEGIN, END);

        const [tEc, tEq] = this.calcConjunction(this.sunPolynom.POLYNOM, this.moonPolynom.POLYNOM);

        this.conjunction = tEc + this.T0;
        this.equatorConjunction = tEq + this.T0;
    }

    calcConjunction(sun, moon) {
        const DELTA = 29.5 / (2 * PI);
        let t;
        // ecliptica
        let tEc = 0, tEq = 0, i = 0, selisih, dt;
        for (i = 0; i < 20; i++) {
            selisih = base.horner(tEc, moon.L) - base.horner(tEc, sun.L);
            selisih = base.pmod(selisih + PI, 2 * PI) - PI;
            dt = selisih * DELTA;
            tEc -= dt;
            if (abs(dt) < ERR) {
                break;
            }
        }

        // equator
        for (i = 0; i < 20; i++) {
            selisih = base.horner(tEq, moon.Ra) - base.horner(tEq, sun.Ra);
            selisih = base.pmod(selisih + PI, 2 * PI) - PI;
            dt = selisih * DELTA;
            tEq -= dt;
            if (abs(dt) < ERR) {
                break;
            }
        }

        return [tEc, tEq];
    }

    info() {
        const {deltaT, meeusConjunction, conjunction, equatorConjunction, T0, begin, end} = this;
        return {deltaT, meeusConjunction, conjunction, equatorConjunction, T0, begin, end,
            suns: this.sunPolynom.POLYNOM,
            moons: this.moonPolynom.POLYNOM,
        };
    }

    fragment(day = 0) {
        const T0 = this.T0 + day;
        const BEGIN = -13 / 24;
        const END = 24 / 24;
        const ORDE = 3;
        const solar = new position.Solar(true, ORDE);
        const moon = new position.Moon(true, ORDE);
        const sunPolynom = solar.polynom(T0, BEGIN, END);
        const moonPolynom = moon.polynom(T0, BEGIN, END);
        const eots = [];
        for (let i = 0; i <= ORDE; i++) {
            let x = i / ORDE * (END - BEGIN) + BEGIN;
            let jde = T0 + x + this.deltaT / 86400;
            eots.push([x, eqtime.eSmart(jde) / (2 * PI)]);
        }
        const result = {
            T0: T0,
            SHa: sunPolynom.POLYNOM.GHA,
            SDec: sunPolynom.POLYNOM.Dec,
            MHa: moonPolynom.POLYNOM.GHA,
            MDec: moonPolynom.POLYNOM.Dec,
            eot: eqtime.eSmart(T0) / (2 * PI),
            EqTime: interpolation.lagrangePoly(eots),
            hp: asin(6378.137 / moonPolynom.POLYNOM.R[0]),
        };
        return result;
    }

    /**
     * 
     * @param {Object} g globe coordinate
     * @param {Number} day 
     * @param {Object} method 
     * @return {Object}
     */
    calc(g, day = 0, method) {
        let jd = this.T0 + day + g.lon / (2 * PI);
        // sun set.
        let alt = -50 / 60 * D2R;
        let sunSet = this.sunPolynom.rise(jd, g, alt, 1);

        const sunPos = this.sunPolynom.calc(sunSet, g, method);
        const moonPos = this.moonPolynom.calc(sunSet, g, method);

        alt = -34 / 60 * D2R + moonPos.hp - moonPos.sd; // altitude terbenam bulan
        let moonSet = this.moonPolynom.rise(sunSet - 2 / 24, g, alt, 1);
        const result = {
            sunSet, sunPos, moonSet, moonPos,
            age: sunSet - this.conjunction,
            duration: moonSet - sunSet,
            limb: base.limb(moonPos, sunPos),
            alt: moonPos.alt,
        };

        if (g && method.elongation == 't') {
            const p1 = toHorizontal2(moonPos, g);
            const p2 = toHorizontal2(sunPos, g);

            p1.alt -= (moonPos.hp || 0) * cos(p1.alt);
            p2.alt -= (sunPos.hp || 0) * cos(p2.alt);
            result.elongation = horizontalSep(p1, p2);
        } else {
            result.elongation = angle.sep(sunPos, moonPos);
        }

        const [sψ, cψ] = base.sincos(result.elongation);
        let i = atan(sunPos.range * sψ / (moonPos.range - sunPos.range * cψ));
        if (i < 0) {
            i += PI;
        }
        result.fraction = (1 + cos(i)) / 2;
        result.phase = base.pmod(moonPos.lon - sunPos.lon, 2 * PI);

        return result;
    }
}

export class Criteria {
    constructor(alt, elongation, age, method_alt, method_elongation) {
        if (typeof alt === 'object') {
            age = alt.age;
            elongation = alt.elongation;
            method_alt = alt.method_alt;
            method_elongation = alt.method_elongation;
            alt = alt.alt;
        }
        this.alt = (alt || 0) * D2R;
        this.elongation = (elongation || 0) * D2R;
        this.age = (age || 0) / 24.0;
        this.method_elongation = method_elongation || 'g';
        this.method_alt = method_alt || 'a';
    }

    test(info) {
        let valid = info.alt >= this.alt && info.elongation >= this.elongation;
        return valid || (this.age > 0 && info.age > this.age);
    }
}

export class Hijriah {
    constructor(criteria) {
        this.criteria = criteria || new Criteria();
    }

    calcCurrent(g) {
        let [y, m] = currentMonth();
        let k = 12 * y + m;
        const rows = this.calc(g, k - 1, k);
        return {
            ...rows[1],
            prevCount: rows[0].count,
        }
    }

    calcMonth(g, y, m) {
        let [y_, m_] = currentMonth();
        let k = 12 * (y || y_) + (m || m_);
        const rows = this.calc(g, k - 1, k);
        return {
            ...rows[1],
            prevCount: rows[0].count,
        }
    }

    /**
     * 
     * @param {Object} g geograpic coordinat
     * @param {*} k1 lunation = 12*y1 + m1
     * @param {*} k2  lunation = 12*y2 + m2
     */
    calc(g, k1, k2) {
        if (!k2 || k2 <= k1) {
            k2 = k1 + 1;
        } else {
            k2++;
        }
        const criteria = this.criteria;
        const method = {
            alt: criteria.method_alt || 'a',
            elongation: criteria.method_elongation || 'g',
        };
        let hilal, info, result = new Array(k2 - k1), lastNewMoonJD;
        let y = floor((k2 - 1) / 12);
        let m = (k2 - 1) % 12 + 1;
        hilal = Hilal.create(y, m);
        info = hilal.calc(g, 0, method);
        lastNewMoonJD = info.sunSet;
        if (!criteria.test(info)) {
            lastNewMoonJD += 1;
        }

        for (let k = k2 - 1; k >= k1; k--) {
            y = floor((k - 1) / 12);
            m = (k - 1) % 12 + 1;
            hilal = new Hilal(y, m);
            info = hilal.calc(g, 0, method);

            let newMoonJD = info.sunSet;
            if (!criteria.test(info)) {
                newMoonJD += 1;
            }
            let days = floor(lastNewMoonJD - newMoonJD + 0.5);
            lastNewMoonJD = newMoonJD;
            result[k - k1] = {
                year: y, month: m,
                jd: newMoonJD,
                count: days,
                sunSet: info.sunSet,
                moonSet: info.moonSet,
                alt: info.alt,
                elongation: info.elongation,
                age: info.age,
                conjunction: hilal.conjunction,
            }
        }
        return result;
    }
}

export class Aritmatic {
    constructor(kabisat, koreksi) {
        this.JD0 = 1948438 + (koreksi || 0);
        let years = [], c = 0;
        for (let i = 0; i < 30; i++) {
            years[i] = {day: c, isLeap: (kabisat.indexOf(i + 1) >= 0)};
            c += (years[i].isLeap ? 355 : 354);
        }
        if (c !== 10631) {
            throw `List kabisat [${kabisat.join(',')} = ${c} hari] tidak valid. Jumlah hari dalam 30 tahun tidak sama dengan 10631`
        }
        this.years = years;
    }

    toJD(y, m = 1, d = 1) {
        let y30 = floor((y - 1) / 30);
        let jd = y30 * 10631;
        y = y - y30 * 30;
        jd += this.years[y - 1].day;
        return this.JD0 + jd + 30 * (m - 1) - (floor((m - 1) / 2)) + d;
    }

    fromJD(jd) {
        let day = floor(jd) - this.JD0;
        if (day < 0) {
            return false;
        }
        let y = floor((day - 1) / 10631) * 30;
        day -= (y / 30) * 10631;
        let i;
        for (i = 1; i < 30; i++) {
            if (day < this.years[i].day) {
                y += i;
                day -= this.years[i - 1].day;
                break;
            }
        }
        let m = floor((day - 1) / 59) * 2;
        day = day - (m * 29.5);
        if (day > 30) {
            day -= 30;
            m++;
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

export function moonPhases(year) {
    year = Math.floor(year);
    let k = 12 * year - 17050;
    const result = [];
    for (let m = 1; m <= 12; m++) {
        let y = (k + m) / 12.3685 + 2000;
        const row = {
            y: year,
            m,
            deltaT: deltaT(y),
            phases: [
                moonphase.newMoon(y),
                moonphase.first(y),
                moonphase.full(y),
                moonphase.last(y),
            ]
        }
        result.push(row);
    }
    return result;
}

export default {Hilal, Hijriah, Aritmatic, currentMonth, moonPhases, MONTHS}