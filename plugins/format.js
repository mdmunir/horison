import julian from 'astronomia/src/julian';

//
//console.log(' window moment');
const {abs, floor, round, random} = Math;
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

function hms(value, format, fixed = 2, compact = false) {
    let neg = value < 0;
    value = abs(value);
    let d = floor(value);
    let m = floor((value - d) * 60);
    let s = ((value - d - m / 60) * 3600).toFixed(fixed);
    let s2 = parseFloat(s) < 10 ? '0' + s : s;

    let result = '';
    if (compact && d == 0 && m == 0) {
        result = `${s}s`;
    } else if (compact && d == 0) {
        result = `${m}m${s2}s`;
    } else {
        m = (m < 10 ? '0' : '') + m;
        result = `${d}h${m}m${s2}s`;
    }
    switch (format) {
        case 1: //
            result = result.replace('h', '°').replace('m', "'").replace('s', '"');
            break;
        case 2: //
            result = result.replace('h', 'ʰ').replace('m', 'ᵐ').replace('s', 'ˢ');
            break;
        case 3: //
            result = result.replace('h', ':').replace('m', ':').replace('s', '');
            break;
    }
    return (neg ? '-' : '') + result;
}

Number.prototype.dms = function (fixed = 2, compact = false) {
    return hms(this, 1, fixed, compact);
}

Number.prototype.hms = function (fixed = 2, compact = false) {
    return hms(this, 0, fixed, compact);
}

Number.prototype.hms2 = function (fixed = 2, compact = false) {
    return hms(this, 2, fixed, compact);
}

Number.prototype.asTime = function (fixed = 2, compact = false) {
    return hms(this, 3, fixed, compact);
}

Number.prototype.toDate = function () {
    return Date.fromJD(this);
}

const ARABS = ['٠',
    '١',
    '٢',
    '٣',
    '٤',
    '٥',
    '٦',
    '٧',
    '٨',
    '٩'
];

Number.prototype.toArab = function (fixed) {
    let s = fixed ? this.toFixed(fixed) : this.toString();
    return s.replace(/\d/g, m => ARABS[parseInt(m)]);
}

Number.prototype.toCalendar = function () {
    return julian.JDToCalendar(this, this < JD0_GREGORIAN);
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
    return new julian.Calendar().fromDate(this).toJD();
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
    return new julian.Calendar().fromJD(jd + 1 / MS_DAY).toDate();
}

let oldGetDay = Date.prototype.getDay;
Date.prototype.getDay = function () {
    let t = this.getTime();
    if (t >= T0_GREGORIAN) {
        return oldGetDay.call(this);
    }
    return Math.floor(this.toJD() + 1.5 - this.getTimezoneOffset() / 1440) % 7;
}

let oldUTCGetDay = Date.prototype.getUTCDay;
Date.prototype.getUTCDay = function () {
    let t = this.getTime();
    if (t >= T0_GREGORIAN) {
        return oldUTCGetDay.call(this);
    }
    return Math.floor(this.toJD() + 1.5) % 7;
}
