import elp from 'astronomia/src/elp';
import moonposition from 'astronomia/src/moonposition';
import elpMppDe from 'astronomia/data/elpMppDe';

export const elpMoon = new elp.Moon(elpMppDe);

/**
 *
 * @param {Number} jde - Julian ephemeris day
 * @returns {Object}
 *   {Number} lon - ecliptic longitude in radians
 *   {Number} lat - ecliptic latitude in radians
 *   {Number} range - range in KM
 */
export function position(jde) {
    return elpMoon.position(jde);
}

/**
 *
 * @param {Number} jde - Julian ephemeris day
 * @returns {Object}
 *   {Number} lon - ecliptic longitude in radians
 *   {Number} lat - ecliptic latitude in radians
 *   {Number} range - range in KM
 */
export function meeus(jde) {
    return moonposition.position(jde);
}

export default {elpMoon, position, meeus};