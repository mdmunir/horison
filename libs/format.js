import julian from 'astronomia/src/julian';
const {abs, floor, round} = Math;
const T0_GREGORIAN = -12219292800000; //1582-10-15
const JD0_GREGORIAN = 2299160.5;
const MS_DAY = 86400000;

const ZONE_REGEX1 = /(\d+:\d+(:[\d\.]+)?)\s*(GMT|UTC|Z)?((\+|-)(\d\d:?\d\d))$/
const ZONE_REGEX2 = /(\d+:\d+(:[\d\.]+)?)\s*(GMT|UTC|Z)$/

String.prototype.padMidle = function (length, ch = ' ') {
    let s = this.trim();
    let n = (length + s.length) / 2;
    return s.padEnd(n, ch).padStart(length, ch);
}

Number.prototype.dms = function (fixed = 2, compact = false) {
    let value = this;
    let neg = value < 0;
    value = abs(value);
    let d = floor(value);
    let m = floor((value - d) * 60);
    let s = (value - d - m / 60) * 3600;

    let result = '';
    if (compact && d == 0 && m == 0) {
        result = `${s.toFixed(fixed)}"`;
    } else if (compact && d == 0) {
        s = (s < 10 ? '0' : '') + s.toFixed(fixed);
        result = `${m}'${s}"`;
    } else {
        m = (m < 10 ? '0' : '') + m;
        s = (s < 10 ? '0' : '') + s.toFixed(fixed);
        result = `${d}°${m}'${s}"`;
    }
    return (neg ? '-' : '') + result;
}

Number.prototype.toScientific = function (digit, f) {
    let n = Math.log10(Math.abs(this));
    if (n > digit) {
        return this.toExponential(digit);
    } else if (n < -3) {
        return this.toExponential(f || 6);
    } else if (n < 0) {
        return this.toFixed((f || 6) - n);
    } else {
        return this.toFixed(digit - n);
    }
}

String.prototype.toDate = function () {
    let str = this;
    if (!str) {
        return false;
    }
    str = str.trim();
    let m = str.match(/^JD\s+([\d\.]+)/i);
    if (m && m[1]) {
        return Date.fromJD(parseFloat(m[1]));
    }
    if (str.match(/^\d{4}-\d{2}-\d{2}$/)) {
        str += ' 00:00:00Z';
    } else if (ZONE_REGEX1.test(str)) {
        str = str.replace(ZONE_REGEX1, '$1$4');
    } else if (ZONE_REGEX2.test(str)) {
        str = str.replace(ZONE_REGEX2, '$1Z');
    } else {
        str += 'Z';
    }
    try {
        return new Date(str);
    } catch (e) {
        return false;
    }
}

String.prototype.toJD = function () {
    let date = this.toDate();
    return date ? date.toJD() : false;
}

/**
 * 
 * @returns {Number}
 */
Date.prototype.toJD = function () {
    let t = this.getTime();
    if (t >= T0_GREGORIAN) {
        return JD0_GREGORIAN + (t - T0_GREGORIAN) / MS_DAY;
    }
    return julian.DateToJD(this);
}

/**
 * 
 * @param {Number} jd
 * @returns {Date}
 */
Date.fromJD = function (jd) {
    if (jd >= JD0_GREGORIAN) {
        return new Date((jd - JD0_GREGORIAN) * MS_DAY + T0_GREGORIAN + 1);
    }
    return julian.JDToDate(jd + 1 / MS_DAY);
}