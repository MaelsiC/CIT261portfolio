import { getJSON, getLocation } from './utilities.js';
import QuakesController from './QuakesController.js';

const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

const quakes = document.getElementById("quakeList");
const qc = new QuakesController(quakes);
qc.init();
console.log('okay');

// qc.quakes.getEarthQuakesByRadius(getLocation());
// console.log('okay');