﻿// File Name: graph.js
// Description: This file generates graphs based on parsed data
// Date Created: 3/17/2015
// Contributors: Nicholas Dyszel, Berty Ruan, Arun Kumar
// Date Last Modified: 3/19/2015
// Last Modified By: Nicholas Dyszel, Berty Ruan, Arun Kumar
// Dependencies: client_parser.js, ..., [Google Charts API]
// Additional Notes: N/A



// Author: Nicholas Dyszel, Berty Ruan, Arun Kumar
// Date Created: 3/17/2015
// Last Modified: 3/21/2015 by Berty Ruan
// Description: Takes 1 stat ID and stat data and generates a graph (Google Charts API)
// PRE: N/A
// POST: N/A
function GenerateSingle()//statID, data)
{
	//code below is the supposed inputs statID and data
	/* 
	$.getScript("parser_test.js");

	var data1 =                         // JSON of random    numbers
    {
    1:
    {
       1: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
       2: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
       3: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
    },
    };

    var cids1 = [1]; 
 	var outputArray1 = ParseData(data1,cids1); // fills outputArray with parsed JSON data
	var data = google.visualization.arrayToDataTable(outputArray1);
	*/

	//input comes from client_parser.js
	//statID -> String
	//data   -> Array of floats

	
	// Some raw data (not necessarily accurate)
	var data = google.visualization.arrayToDataTable([
	['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
	['2004/05',  165,      938,         522,             998,           450,      614.6],
	['2005/06',  135,      1120,        599,             1268,          288,      682],
	['2006/07',  157,      1167,        587,             807,           397,      623],
	['2007/08',  139,      1110,        615,             968,           215,      609.4],
	['2008/09',  136,      691,         629,             1026,          366,      569.6]
	]);
	
	var options = {
	title : 'Monthly Coffee Production by Country',
	vAxis: {title: "Cups"},
	hAxis: {title: "Month"},
	seriesType: "bars",
	series: {5: {type: "line"}}
	};

	var chart = new google.visualization.ComboChart(document.getElementById('graph'));
	chart.draw(data, options);

}
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(GenerateSingle);




// Author:
// Date Created:
// Last Modified:
// Description: Takes 1 stat ID and stat data and generates a graph
//     using the
// PRE: statID indicates a valid and bounded stat
// POST:
function GenerateSingleBounded(statID, data) {

}

// Author:
// Date Created:
// Last Modified:
// Description: Takes 1 stat ID and stat list and generates a graph
//     using data from multiple countries
// PRE:
// POST:
function GraphMultiple(statID, list) {

}

// Author:
// Date Created:
// Last Modified:
// Description: Takes 1 stat ID and stat list and generates a graph
//     of the sum of the countries' data
// PRE:
// POST:
function GenerateSum(statID, list) {

}

// Author:
// Date Created:
// Last Modified:
// Description: Takes 1 stat ID and stat list and generates a graph
//     of the sum of the countries' data as well as their bounds
// PRE: statID indicates a valid and bounded stat
// POST:
function GenerateSumBounded(statID, list) {

}
