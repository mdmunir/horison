
import planetposition from 'astronomia/src/planetposition'
import vsop87Bearth from 'astronomia/data/vsop87Bearth'

const earth = new planetposition.Planet(vsop87Bearth)

export default earth;
