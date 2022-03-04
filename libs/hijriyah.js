import base from 'astronomia/src/base';
import moonphase from 'astronomia/src/moonphase';
import angle from 'astronomia/src/angle';
import horison from './horison';
import position from './position';

const {PI, abs, atan, cos, floor} = Math;
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

export function currentMonth(d = 0) {
    let d2000 = (new Date).toJD() - 2451545.0 + d;
    let k = floor(d2000 / 29.53066257024) + 17050 - 1;
    let y = floor(k / 12);
    let m = k % 12;
    return [y, m + 1];
}

export class Hilal {
    /**
     * 
     * @param {Number} y 
     * @param {Number} m 
     */
    constructor(y, m) {
        this.k = 12 * y + m - 17050;

        this.y = this.k / 12.3685 + 2000;
        this.deltaT = horison.deltaT(this.y);

        let jde = moonphase.newMoon(this.y);
        this.meeusConjunction = jde - this.deltaT / 86400;
        this.T0 = floor(jde);
        let jam = floor((jde - this.T0) * 24) / 24;
        this.H0 = this.T0 + jam;

        const BEGIN = jam - 1.25;
        const END = jam + 2;
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

    /**
     * 
     * @param {Object} g globe coordinate
     * @param {Number} day 
     * @return {Object}
     */
    calc(g, day = 0) {
        let jd = this.H0 + day;
        // sun set.
        let alt = -50 / 60 * D2R;
        let sunSet = this.sunPolynom.rise(jd, g, alt, 1);
        alt = 0.125 * D2R; // standar refraksi bulan.
        let moonSet = this.moonPolynom.rise(jd - 1.5 / 24, g, alt, 1);
        const sunPos = this.sunPolynom.calc(sunSet, g);
        const moonPos = this.moonPolynom.calc(sunSet, g);
        const result = {
            sunSet, sunPos, moonSet, moonPos,
            age: sunSet - this.conjunction,
        };
        result.elongation = angle.sep(sunPos, moonPos);
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
    constructor(alt, elongation, age) {
        this.alt = (alt || 0) * D2R;
        this.elongation = (elongation || 0) * D2R;
        this.age = (age || 0) / 24.0;
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
        let hilal, info, result = new Array(k2 - k1), lastNewMoonJD;
        let y = floor((k2 - 1) / 12);
        let m = (k2 - 1) % 12 + 1;
        hilal = new Hilal(y, m);
        info = hilal.calc(g);
        lastNewMoonJD = info.sunSet;
        if (!criteria.test(info)) {
            lastNewMoonJD += 1;
        }

        for (let k = k2 - 1; k >= k1; k--) {
            y = floor((k - 1) / 12);
            m = (k - 1) % 12 + 1;
            hilal = new Hilal(y, m);
            info = hilal.calc(g);

            let newMoonJD = info.sunSet;
            if (!criteria.test(info)) {
                newMoonJD += 1;
            }
            let days = floor(lastNewMoonJD - newMoonJD + 0.5);
            lastNewMoonJD = newMoonJD;
            result[k - k1] = {
                y, m, jd: newMoonJD, days, info,
            }
        }
        return result;
    }

    toJD(y, m = 1, d = 1) {

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

export default {Hilal, Hijriah, Aritmatic, currentMonth, MONTHS}