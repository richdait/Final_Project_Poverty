<!-- mainwindow -->
<div id= 'map'></div>
<!-- sidebar -->
<div id="info">

<!-- Social media and dataset links -->
<span style= "float:right"><span><a href="https://data-seattlecitygis.opendata.arcgis.com/datasets/a-community-reporting-areas-profile-acs-5-year-2013-2017?geometry=-122.858%2C47.534%2C-121.815%2C47.696" target="_blank"><i class="fa fa-globe"></i></a></span>
<span><a href="https://www.census.gov/newsroom/press-kits/2018/acs-5year.html" target="_blank"><i class="fa fa-info-circle"></i></a></span>
<span><a href="https://github.com/richdait/Final_Project_Poverty" target="_blank"><i class="fa fa-github"></i></a></span></span></span>

<p>Cartographer: Richard Dait</br>Course: GEOG 458 AB Advanced Digital Geographies
</br>Final Project: A Smart Dashboard on Poverty</p>
</br>
</br>

<center> <div id="title"> The Spatial Variation of Poverty</br>in Seattle, WA </div> </center>

<center> <p id="placename"></p></center>

<div id="count" class="card">

<div id="#bar-chart" width="400" height="300"></div>


<h5 id="desc"> Percentage of the Population with Income Below the</br>200% Federal Poverty Level from 2013 - 2017</h5>

<center><p id="poverty-percentage"></p></center>

</div>

<div id="bar-chart"></div>

<div id="footer">
      According to a 2016 American Community Survey estimate, Seattle had a population of over seven hundred thousand
      with a poverty rate of <a href="https://www.seattle.gov/opcd/population-and-demographics/about-seattle#prosperity"><i>11.5%</i></a>.
      While it was slightly lower than the national average at
      <a href="https://www.census.gov/library/publications/2017/demo/p60-259.html#:~:text=The%20official%20poverty%20rate%20in,14.8%20percent%20to%2012.7%20percent.12.7%">
      12.7%</a>, the city and its inhabitants were impacted in various ways. Poverty manifest itself through
      inadequate education, lack of income, hunger, homelessness, mental illness, poor health and other undesirable
      conditions.
    </br>
    </br>
      Unfortunately, poverty disproportionately impacts certain groups more than others. This is
      evident as some areas of the city have higher concentration levels of poverty.
      The smart dashboard to the right illustrates the disparate geography of poverty in Seattle, WA
      from 2013 -2017. Data were obtained from a five year series via American Community Survey (ACS) and
      <a href="https://data-seattlecitygis.opendata.arcgis.com/datasets/a-community-reporting-areas-profile-acs-5-year-2013-2017?geometry=-122.858%2C47.534%2C-121.815%2C47.696">
      Seattle Open Data Portal</a>. The name of the neighborhood along with the percentage of the population with income
      below the 200% federal poverty level from 2013 - 2017 is displayed once a census tract polygon is clicked. When
      outside of the Seattle featured boundaries is clicked, the smart dashboard displays the default location - Seattle -
      and its corresponding poverty percentage. A link to the dataset is located above via the globe icon.

</div>
</div>

<script>

// Creates a map element
var mymap = L.map('map').setView([47.6039614, -122.50037], 11);

// Adds zoom control
new L.Control.Zoom({position: 'topright'}).addTo(mymap);

// Adds a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);

// Adds a base map.
var lightBasemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'poverty.geoJSON; ACS and ArcGIS Hub | Font Awesome; Globe, Info and Github Icons | Carto; Basemap | Cartographer By Richard Dait'
}).addTo(mymap);

// Declares global variables for the poverty layer, bar chart and displayed percentage.
var povertyLayer = null,
bchart = null,
tracts = {};

// Loads all datasets through promise mechanism and store them in an array.
Promise.all([$.getJSON("assets/poverty.geojson")]).then(function(datasets) {

// Links poverty layer to geojson data and attach to map.
povertyLayer = L.geoJSON(datasets[0], {
     onEachFeature: onEachFeature
  }).addTo(mymap);

// Adds three events to the the layer povertyLayer for a user to interact with.
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    click: clickFeature,
    mouseout: resetHighlight
  });
}

// This function works when a user hovers over on a map feature.
function highlightFeature(e) {
  // e indicates the current event
  var feature = e.target; //the target captures the object which the event associates with
  feature.setStyle({
    weight: 2,
    opacity: 0.8,
    color: '#e3e3e3',
    fillColor: '#00ffd9',
    fillOpacity: 0.1
  });
}

// This function executes when the mouse clicks on a map feature. The neighborhood
// and associated poverty percentage displays on the smart dashboard.
function clickFeature(e) {
  L.DomEvent.stopPropagation(e);
  $("#placename").text(e.target.feature.properties.GEN_ALIAS + " Neighborhood");
  $("#poverty-percentage").text(e.target.feature.properties.PCT_POP_20);
}

// Resets the hightlighted feature when the mouse is outside of Seattle.
function resetHighlight(e) {
  povertyLayer.resetStyle(e.target);
}

// Links the onMapClick function to the mymap object.
mymap.on('click', onMapClick);

// When a user clicks outside the Seattle boundaries, the default value and
// city will display.
function onMapClick(e) {
  $("#placename").text("Seattle");
  $("#poverty-percentage").text("11.5");
}

// Generates the declared dictionary object "tracts".
// Adds the neighborhood name as a key and the poverty percentage in a dictionary declared before.
datasets[0].features.forEach(function(d) {
  tracts[d.properties.PCT_POP_20] = d.properties.GEN_ALIAS;})

// This function takes a dictionary, then, returns a dictionary that sorts by poverty percentage.
function sortJsObject(obj) {items = Object.keys(obj).map(function(key) {
  return [key, obj[key]];});
  items.sort(function(first, second) {return second[1] - first[1];});
  sorted_obj = {}
  $.each(items, function(k, v) {
    use_key = v[0]
    use_value = v[1]
    sorted_obj[use_key] = use_value})
    return (sorted_obj)}

// Executes the sortJsObject function.
tracts_sorted = sortJsObject(tracts);

// Slices the arrays.
// Keeps only the top 10 values, and pushes ???tracts??? to the first of the array.
x = Object.keys(tracts_sorted).slice(0, 10);
x.reverse();
x.push("percentage");
x.reverse();

// Keeps only the top 10 values, and push ???#??? to the first of the array.
y = Object.values(tracts_sorted).slice(0, 10);
y.reverse();
y.push("#");
y.reverse();

// Generate the chart
bchart = c3.generate({size: {height: 350, width: 460},
  data: {x: "percentage",
  columns: [x, y],
  type: "bar",
  onclick: function(d) {
    // Updates the map and sidebar once the bar is clicked.
    var tractName = x[d.x + 1];

    // Displays the onclick feature's name to the tag with id 'placename' and 'poverty-percentage'on dashboard.
    $("#placename").text(tractName + " Neighborhood");
    $("#poverty-percentage").text(tracts[tractName]);

    datasets[0].features.forEach(function(t) {
      if (t.properties.GEN_ALIAS == tractName) {
        tractbound = L.geoJSON(t);
        mymap.fitBounds(tractbound.getBounds());
        mymap.setZoom(12);
      }
    });
  }
},

axis: {x: {type: "category", tick: {rotate: -60, multiline: false}},
y: {tick: {values: [5, 10, 15, 20, 25, 30]
},
}
},
legend: {show: false},
bindto: "#bar-chart"
});
});
