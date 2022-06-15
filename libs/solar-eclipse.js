import {sincos, toRad} from 'astronomia/src/base';

const {sin, cos, tan, atan2, asin} = Math;

const EARTH_RADIUS = 6378;
const SUN_RADIUS = 109.125;
const k1 = 0.272281;
const k2 = 0.272281;

function calcBessel(sun, moon, gst) {
    const [ssa, csa] = sincos(sun.ra);
    const [ssd, csd] = sincos(sun.dec);
    const [sma, cma] = sincos(moon.ra);
    const [smd, cmd] = sincos(moon.dec);
    const [sr, mr] = [sun.range / EARTH_RADIUS, moon.range / EARTH_RADIUS];

    let b = mr / sr;
    const ra = atan2(csd * ssa - b * cmd * sma, csa * csd - b * cma * cmd);
    const d = atan2(sin(ra) * (ssd - b * smd), csd * ssa - b * cmd * sma);
    const g = (ssd - b * smd) / sin(d);

    const [sind, cosd] = sincos(d);
    const [sina, cosa] = sincos(sun.ra - a);

    const x = mr * (cmd * sina);
    const y = mr * (smd * cosd - cmd * sin * cosa);
    const z = mr * (smd * sind + cmd * cosd * cosa);

    const f1 = asin((SUN_RADIUS + k1) / g);
    const f2 = asin((SUN_RADIUS - k2) / g);

    const c1 = z + k1 / sin(f1);
    const c2 = z - k2 / sin(f2);

    const l1 = c1 * tan(f1);
    const l2 = c2 * tan(f2);

    return {
        x, y,
        d, μ: gst - ra,
        l1, l2,
        tanF1: tan(f1), tanF2: tan(f2)
    }
}

function generateBesselianElement(y, earth, elpMoon){
    
}