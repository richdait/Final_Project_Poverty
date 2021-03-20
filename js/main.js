<!-- mainwindow -->
<div id= 'map'></div>
<!-- sidebar -->
<div id="info">

<span style= "float:right"><span><a href="https://data-seattlecitygis.opendata.arcgis.com/datasets/a-community-reporting-areas-profile-acs-5-year-2013-2017?geometry=-122.858%2C47.534%2C-121.815%2C47.696" target="_blank"><i class="fa fa-globe"></i></a></span>
<span><a href="https://www.census.gov/newsroom/press-kits/2018/acs-5year.html" target="_blank"><i class="fa fa-info-circle"></i></a></span>
<span><a href="https://github.com/richdait" target="_blank"><i class="fa fa-github"></i></a></span></span></span>

<p>Cartographer: Richard Dait</br>Course: GEOG 458 AB Advanced Digital Geographies
</br>Final Project: A Smart Dashboard on Poverty</p>
</br>
</br>

<center> <div id="title"> The Geography of Poverty</br>in Seattle, WA </div> </center>

<center> <p id="placename"></p>Seattle</center>

<div id="count" class="card">

<h5 id="desc"> Percentage of the Population with Income Below the</br>200% Federal Poverty Level from 2013 - 2017</h5>

<center><p id="poverty-percentage">11</p></center>

</div>

<div id="county-chart"></div>

<div id="footer">
      According to a 2016 American Community Survey estimate, Seattle had a population of over seven hundred thousand
      and a poverty rate of <a href="https://www.seattle.gov/opcd/population-and-demographics/about-seattle#prosperity"><i>11.5%</i></a>.
      While it was slightly lower than the national average at
      <a href="https://www.census.gov/library/publications/2017/demo/p60-259.html#:~:text=The%20official%20poverty%20rate%20in,14.8%20percent%20to%2012.7%20percent.12.7%">
      12.7%</a>, the city and its inhabitants were impacted in various ways. Poverty manifest itself through
      inadequate education, lack of income, hunger, homelessness, mental illness, poor health and other undesirable
      conditions.
    </br>
    </br>
      Unfortunately, poverty disproportionately affects certain groups. Additionally, parts of the city appear to have
      higher levels more than others. The smart dashboard to the right illustrates the geography of poverty in Seattle, WA
      from 2013 -2017. Data were obtained from a five year series via American Community Survey (ACS) and
      <a href="https://data-seattlecitygis.opendata.arcgis.com/datasets/a-community-reporting-areas-profile-acs-5-year-2013-2017?geometry=-122.858%2C47.534%2C-121.815%2C47.696">
      Seattle Open Data Portal</a>. The percentage of the population with income below the 200% federal poverty level
      from 2013 - 2017 is displayed once you click on a census tract polygon.

</div>
</div>

<script>

var mymap = L.map('map').setView([47.6039614, -122.40037], 11.5);

new L.Control.Zoom({
position: 'topright'
}).addTo(mymap);

// Adds a base map.
// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
// attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
// ).addTo(mymap);

lightBasemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png');
satelliteBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
mymap.addLayer(lightBasemap);

// 4. Declare three global variables for the wa counties thematic layer, bar chart, and the organized wa data.
var tractsLayer = null,
  bchart = null,
  tracts = {};

// 5. load all datasets through promise mechnism and store them in an array
Promise.all([$.getJSON("assets/poverty.geojson")]).then(function(datasets) {

  // 6. Map relevant operations

  // 6.1 create a couties layer
  tractsLayer = L.geoJSON(datasets[0], {
     onEachFeature: onEachFeature
  }).addTo(mymap);

// });

// 6.2 add three events to the the layer “countiesLayer”.
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    click: clickFeature,
    mouseout: resetHighlight
  });
}

// 6.3 this function works when the mouse hovers over on a map feature.
function highlightFeature(e) {
  // e indicates the current event
  var feature = e.target; //the target capture the object which the event associates with
  feature.setStyle({
    weight: 2,
    opacity: 0.8,
    color: '#e3e3e3',
    fillColor: '#00ffd9',
    fillOpacity: 0.1
  });
}

// 6.4 this function executes when the mouse clicks on a map feature.
function clickFeature(e) {
  L.DomEvent.stopPropagation(e);
  $("#placename").text(e.target.feature.properties.GEN_ALIAS + " Neighborhood");
  $("#poverty-percentage").text(e.target.feature.properties.PCT_POP_20);
}

// 6.5 reset the hightlighted feature when the mouse is out of its region.
function resetHighlight(e) {
  tractsLayer.resetStyle(e.target);
}

// 6.6 bind the onMapClick function to the mymap object.
mymap.on('click', onMapClick);
// when click on any place on the map expect the counties layer, the text on the sidebar will be reset to the total number of WA.
function onMapClick(e) {
  $("#placename").text("Washington");
  $("#percentage-percentage").text("341");
}

// 7.1 generate the declared dictionary object "counties".
      // add the county name as key and the number of cell tower as values in a dictionary declared before
      datasets[0].features.forEach(function(d) {
        tracts[d.properties.DETL_NAMES] = d.properties.PCT_POP_20;
      })

      // 7.2 this function take a dictionary, return a dictionary that sorted by the number of cell towers.
      function sortJsObject(obj) {
        items = Object.keys(obj).map(function(key) {
          return [key, obj[key]];
        });
        items.sort(function(first, second) {
          return second[1] - first[1];
        });
        sorted_obj = {}
        $.each(items, function(k, v) {
          use_key = v[0]
          use_value = v[1]
          sorted_obj[use_key] = use_value
        })
        return (sorted_obj)
      }
      // 7.3 execute the sortJsObject function
      counties_sorted = sortJsObject(counties);

      // 7.4 slicing the arrays
      // only keep the top 10 values, and push “county” to the first of the array.
      x = Object.keys(counties_sorted).slice(0, 10);
      x.reverse();
      x.push("county");
      x.reverse();

      // only keep the top 10 values, and push “#” to the first of the array.
      y = Object.values(counties_sorted).slice(0, 10);
      y.reverse();
      y.push("#");
      y.reverse();

// 7.5 generate the chart
      bchart = c3.generate({
        size: {
          height: 350,
          width: 460
        },
        data: {
          x: 'county',
          columns: [x, y], //input the x - sorted county number, y - the corresponding # of cell towers.
          type: 'bar', //a bar chart
          onclick: function(d) { }
        },
        axis: {
          x: { //county
            type: 'category',
            tick: {
              rotate: -60,
              multiline: false
            }
          },
          y: { //count
            tick: {
              values: [5, 10, 15, 20, 25, 30]
            },
          }
        },
        legend: {
          show: false
        },
        bindto: "#county-chart" //bind the chart to the place holder element "county-chart".
      });

      // update the map and sidebar once the bar is clicked.
       var tractName = x[d.x + 1];

       //display the onclick feature's name to the tag with id 'placename' and 'county-count'on dashboard
       $("#placename").text(tractName + " County");
       $("#poverty-percentage").text(counties[DETL_NAMES]);

       datasets[0].features.forEach(function(t) {
         if (t.properties.PCT_POP_20 == tractName){
           countybound = L.geoJSON(t);
           mymap.fitBounds(countybound.getBounds());
           maymap.setZoom(12);
         }
       });

});