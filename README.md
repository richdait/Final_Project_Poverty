<h3> Richard Dait
<h3> GEOG 458 AB
<h3> 03/17/2021

</br>
</br>

![alt text](img/poverty.png)

<h1> <p align="center"> <b> Final Project: A Smart Dashboard Illustrating the Spatial Variation of Poverty in Seattle, WA</b> </p> </br>

<h4> I. Introduction and Description </h4>
<p align="left"><h5>
&nbsp; &nbsp; According to a 2016 American Community Survey estimate, Seattle had a population of over seven hundred thousand
with a poverty rate of <a href="https://www.seattle.gov/opcd/population-and-demographics/about-seattle#prosperity"><i>11.5%</i></a>.
While it was slightly lower than the national average at
<a href="https://www.census.gov/library/publications/2017/demo/p60-259.html#:~:text=The%20official%20poverty%20rate%20in,14.8%20percent%20to%2012.7%20percent.12.7%">
12.7%</a>, the city and its inhabitants were impacted in various ways. Poverty manifest itself through
inadequate education, lack of income, hunger, homelessness, mental illness, poor health and other undesirable
conditions. Unfortunately, poverty disproportionately impacts certain groups more than others. This is evident as some areas of the city have higher concentration levels of poverty.
</br>
</br>
&nbsp;&nbsp; The smart dashboard illustrates the geography of poverty in Seattle, WA
from 2013 -2017. Data were obtained from a five year series via American Community Survey (ACS) and  <a href="https://data-seattlecitygis.opendata.arcgis.com/datasets/a-community-reporting-areas-profile-acs-5-year-2013-2017?geometry=-122.858%2C47.534%2C-121.815%2C47.696"> Seattle Open Data Portal</a>. The name of the neighborhood along with the percentage of the population with income below the 200% federal poverty level from 2013 - 2017 is displayed once a census tract polygon is clicked. When outside of the Seattle featured boundaries is clicked, the smart dashboard displays the default location - Seattle - and its corresponding poverty percentage.
A link to the dataset is located above via the globe icon. To interact with the smart dashboard, click on this <mark><a href="https://richdait.github.io/Final_Project_Poverty/poverty">link</a></mark>.
</br>
</br>
&nbsp;&nbsp; Based off the map, the south park neighborhood, located at the southern tip of the Seattle boundary, had the highest percentage of the population with income below the 200% federal poverty level at 61.7%. It was followed closely by the university district at 60.1%. Ironically, the neighborhood located across - Montlake/Portage Bay - reported the lowest percentage at 9.2%. Clicking on the map will show that there is spatial variation. A high concentration of relatively
high values appear to cluster in the south eastern end, indicating a geography of poverty. Whereas much of the western and north western areas have the lowest numbers.
</h5></p>
<h4> II. Goals </h4> <h5> <p align="left">&nbsp;&nbsp; There were many goals to this project. The first was to challenge myself and see what my programming and GIS skills were made of. I can confidently say that I did an adirable job, given the time restriction, other obligations and current conditions we are in. Another goal was to learn as much as possible and practice as I go. Since I have every intention to work in data science or the tech arena, the final project provided me the rigor and practicalities necessary to do well in the real world. Last, but most importantly, my main intention was to build a web project that illustrates a real-world issue that is relevant and requires everyone's attention. While the smart dashboard only brings to light the geography of poverty in Seattle, WA, this is a good starting point for organizations and politicians to select areas where it is highly concentrated, to help those suffering. Since poverty is a complex issue, a simple web project such as this maybe what is needed to institute targeted policies, inspire change and improve the well-being of the most vulnerable.</h5></p>

<p align="left">
<h4> III. Applied Libraries and Web Services </h4>
<h5><p align="left"><ol><li>Leaflet - javascript library to build the web map. <li>D3 - assisted with visualizing the json data.<li>CSS - offered styling for better presentation of the code.<li>HTML and Javascript - languages used to build the code on the html page.<li>Jquery - helped with loading the geoJSON data. <li>CartoDB - supplied the light basemap.<li>Github - serves as the respository hosting service.<li>Font Awesome - provided the three amazing font icons on the dashboard.<li>Atom - text editor used to create the html, write code and upload necessary components to the Github respository.</ol></h5></p>

</h4> <h5>
<h4> IV. Acknowledgment and Credits</center> </h4> <h5> <p align="left">
First and foremost, I would like to thank Professor Bo Zhao and Tyler McCrea for their continuous support and understanding throughout this trying quarter. Both were instrumental in guiding me in the right direction, furthering my knowledge in digital geographies and assisting me with the final project. As for the smart dashboard, I appreciate the template and tutorial provided by the professor on Canvas. They helped tremendously. Credit goes to CartoDB for supplying the basemap. The project html and its various components are hosted on <a href="https://github.com/richdait/Final_Project_Poverty">Github</a>. The globe, info and github icons are courtesy of <a href="https://fontawesome.com/">Font Awesome</a>. Lastly, credit goes out to <a href="https://leafletjs.com/">Leaflet</a> for giving me a platform to build amazing web applications such as this smart dashboard illustrating the spatial variation of poverty in Seattle, WA.

<h4> V. Data Sources and References </h4>
<h5><p><li>City of Seattle Open Data Portal. 2021. <i>A Community Reporting Areas Profile ACS 5-year 2013-2017.</i> https://data-seattlecitygis.opendata.arcgis.com/datasets/a-community-reporting-areas-profile-acs-5-year-2013-2017?geometry=-122.858%2C47.534%2C-121.815%2C47.696 (Accessed on 03/01/2021).</li></br><li>City of Seattle. <i>Prosperity Quick Statistics: About People Living in Seattle.</i> https://www.seattle.gov/opcd/population-and-demographics/about-seattle#prosperity (Accessed on 03/01/2021).</li></br><li>United States Census Bureau. 2017. <i>Income and Poverty in the United States: 2016</i>. https://www.census.gov/library/publications/2017/demo/p60-259.html#:~:text=The%20official%20poverty%20rate%20in,14.8%20percent%20to%2012.7%20percent.12.7% (Accessed on 03/01/2021).</li></h5></p>
