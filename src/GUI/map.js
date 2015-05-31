/*
 * Copyright 2015 Stateware Team: William Bittner, Joshua Crafts, 
 * Nicholas Denaro, Dylan Fetch, Paul Jang, Arun Kumar, Drew Lopreiato,
 * Kyle Nicholson, Emma Roudabush, Berty Ruan, Vanajam Soni
 * 
 * This file is part of Dav3i.
 * 
 * Dav3i is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Dav3i is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Dav3i.  If not, see <http://www.gnu.org/licenses/>.
 */

// File Name:       map.js
// Description:     This module generates a map inside the div 'map', and
//          defines a listener for the button "clear"
// Date Created:    2/24/2015
// Contributors:    Vanajam Soni, Joshua Crafts
// Date Last Modified:  3/26/2015
// Last Modified By:    Vanajam Soni
// Dependencies:    index.html, descriptor.php, by_stat.php, lookup_table.js, loading_script.js, data.js
// Additional Notes:    N/A


// Author: Vanajam Soni, Joshua Crafts
// Date Created: 2/24/2015
// Last Modified: 4/14/2015 by Paul Jang
// Description: This function initializes our map, and also includes overrides for custom functionality
//              (on hover, on select, etc.) and some newly defined helper functions specified below.
// PRE: index.html, jvectormap/jquery-jvectormap-world-mill-en.js, and div with id "map" exist 
// POST: The map is initialized in the div "map"
$(function(){
    // Author: Joshua Crafts
    // Date Created: 3/21/2015
    // Last Modified: 4/14/2015 by Paul Jang
    // Description: This function matches each country/region object in the vector map
    //              to its corresponding value in the HMS section of g_LookupTable and
    //              returns the array, indexed by CC2
    ColorByHMS = function(){
    // PRE:  g_LookupTable is initialized
    // POST: map is recolored in terms of the currently selected stat (based on g_VaccHMS if
    //       stat is vaccinations), where tint of a country is based on the magnitude of its
    //       selected stat value 
        var data = {},				// object indexed by CC2 to attach data to
						//  vector objects
            key,				// holds CC2 when iterating through vector
						//  objects
            index,				// index in g_LookupTable of a given CC2's data
            min,				// minimum data value from HMS data
            max,				// maximum data value from HMS data
            hmsID = g_StatID,			// ID of stat to pull for HMS data
            type = 0,				// type of stat (regular or vaccine)
            i;					// indexing variable

        for (i = 0; i < g_ParsedStatList[1].length && type != 1; i++)	// find which stat to pull
            {								//  if type 1
                if (g_ParsedStatList[1][i] == g_StatID && g_ParsedStatList[0][i] == 1)
                {
                    type = 1;
                    if (g_VaccHMS == 1)
                        hmsID = g_ParsedStatList[2][i];
                    else if (g_VaccHMS == 2)
                        hmsID = g_ParsedStatList[3][i];
                }
            }

        $.when(GetHMS(hmsID,g_HMSYear)).done(function(hmsData){		// pull HMS data from server
            min = Number.MAX_VALUE;					// init min to max value
            max = Number.MIN_VALUE;					// init max to min value
            SetHMS(hmsData[hmsID]);			 		// Need to index in due to JSON
									//  format of by_stat.php
            for (key in map.regions) {					// match HMS to keys
                index = Hash(key);					// index into g_LookupTable by CC2
                if (g_LookupTable[index] !== undefined 			// if data exists for country, add
                    && g_LookupTable[index][4] != -1)			//  to vector object and update
                {							//  min/max
                    data[key] = g_LookupTable[index][4];
                    if (data[key] < min)
                        min = data[key];
                    if (data[key] > max)
                        max = data[key];
                }
            }
            
            // set data series
            map.series.regions[0].params.min = min;
            map.series.regions[0].params.max = max;
            map.reset();
            map.series.regions[0].setValues(data);
            if (!g_HMSReady)						// if first time, set flag to true
                g_HMSReady = true;
        });
    };

    map = new jvm.Map(
    {
        map: 'world_mill_en',					// load map file
        container: $('#map'),					// specify id of container div
        regionsSelectable: true, 				// allows us to select regions
        backgroundColor: 'transparent',
        regionStyle: {
            initial: {						// grey out regions without data
                fill: '#888888'
            },
            hover: {
                "fill-opacity": 0.7				// animate hover
            },
            selected: {
                "stroke-width": 0.4,				// outline and color when selected
                stroke: '#000000',
                fill: '#7FDBFF'
            }
        },
        series: {
            regions: [{
                attribute: 'fill',
                // needs some random init values, otherwise dynamic region coloring won't work
                values: { ID: 148576, PG: 13120.4, MX: 40264.8, EE: 78.6, DZ: 30744.6, MA: 24344.4, MR: 14117.6, SN: 39722.6, GM: 7832.6, GW: 9902.2 },
                scale: ['#22FF70', '#1D7950'],			// specify upper and lower color bounds
                normalizeFunction: 'polynomial'
            }]
        },
        // runs when a region is selected
        onRegionSelected: function()
        {
            if (g_Clear != true)				// when clear is selected, each region is deselected one at a time,
            {							//  so we use this variable to avoid rebuilding the list, generating
                BuildList(map.getSelectedRegions());		//  subdivs, and generating graphs on each deselect, which would run
                GenerateSubDivs();				//  into n^2 time
                GenerateGraphs();
            }
        },
        // runs when region is hovered over
        onRegionTipShow: function(e, label, key){
            var tipString = "",					// string to display when hovering over a country
                i, 						// indexing variable
                type = 0,					// type of stat
                hmsID = g_StatID,				// stat id
		Format = wNumb({				// format for numbers	
			thousand: ','
		}),
                index;						// index in g_LookupTable hashed from key

            index = Hash(key);					// get index into g_LookupTable
            if (g_LookupTable[index] !== undefined)		// if entry exists for region, user server-defined
                tipString += g_LookupTable[index][2];		//  name in hover tip
            else						// else use name defined in map	file
                tipString += label.html()+" - ";
            for (i = 0; i < g_ParsedStatList[1].length && type != 1; i++)		// get stat type and name
            {
                if (g_ParsedStatList[1][i] == g_StatID && g_ParsedStatList[0][i] == 1)
                {
                    type = 1;
                    if (g_VaccHMS == 1)
                        hmsID = g_ParsedStatList[2][i];
                    else if (g_VaccHMS == 2)
                        hmsID = g_ParsedStatList[3][i];
                }
            }
            if (type == 1)
            {
                for (i = 0; i < (g_StatList[hmsID].indexOf("VACC")-1); i++)
                    tipString += g_StatList[hmsID][i];
                tipString += " Vaccinations";
            }
            else
                tipString += g_StatList[hmsID];
            tipString += " in " + g_HMSYear + ": ";
            if (map.series.regions[0].values[key] === undefined)		// notify if no data available
                tipString += "No Data Available";
            else if (type == 1)							// else if it is vaccinations,
            {									// print percentage
                tipString += (map.series.regions[0].values[key] * 100).toFixed(0) + "%";
            }
            else								// else print data normally
            {
                tipString += Format.to(Number(map.series.regions[0].values[key]));
            }
            label.html(tipString);						// output string
        }
    });
    // clearing selected regions when the "clear" button in clicked
    document.getElementById("clear").onclick = function()
    {
        var parentTabDivName = "id-"+g_StatList[g_StatID]+"-graphs";
        // removes graphs subdivs
        document.getElementById(parentTabDivName).innerHTML = "";
        // removes map selections
        g_Clear = true;
        map.clearSelectedRegions();
        BuildList([]);
        g_Clear = false;
    };
});
