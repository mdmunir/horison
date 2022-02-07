import planetposition from 'astronomia/src/planetposition';
import solar from 'astronomia/src/solar';
import vsop87Bearth from 'astronomia/data/vsop87Bearth';

const earth = new planetposition.Planet(vsop87Bearth);
const AU = 149597870;

/**
 * trueVSOP87 returns the true geometric position of the sun as ecliptic coordinates.
 *
 * Result computed by full VSOP87 theory.  Result is at equator and equinox
 * of date in the FK5 frame.  It does not include nutation or aberration.
 *
 * @param {Number} jde - Julian ephemeris day
 * @returns {Object}
 *   {Number} lon - ecliptic longitude in radians
 *   {Number} lat - ecliptic latitude in radians
 *   {Number} range - range in KM
 */
export function position(jde) {
    const pos = solar.trueVSOP87(earth, jde);
    pos.lon -= 20.4898 / 3600 * Math.PI / 180 / pos.range;
    pos.range *= AU;
    return pos;
}


/**
 *
 * @param {Number} jde - Julian ephemeris day
 * @returns {Object}
 *   {Number} lon - ecliptic longitude in radians
 *   {Number} lat - ecliptic latitude in radians
 *   {Number} range - range in KM
 */
export function simple(jde) {
    const T = (jde - 2451545.0) / 36525;
    const {lon, ano} = solar.trueLongitude(T);
    const e = solar.eccentricity(T);    
    return {
        lon,
        lat: 0.0,
        range: AU * 1.000001018 * (1 - e * e) / (1 + e * Math.cos(ano))
    };
}

export default {earth, position, simple};
