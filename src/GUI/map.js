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
// Description: This function initializes the map, fills up the textarea 'cc2_
//      selected' with the list of selected regions and clears the selection
//      on the click of button "clear"
// PRE: index.html and div with id "map" exist 
// POST: The map is initialized in the div "map"
$(function(){
    // Author: Joshua Crafts
    // Date Created: 3/21/2015
    // Last Modified: 4/14/2015 by Paul Jang
    // Description: This function matches each country/region object in the vector map
    //              to its corresponding value in the HMS section of g_LookupTable and
    //              returns the array, indexed by CC2
    // PRE: the HMS section of g_LookupTable is initialized
    // POST: FCTVAL == object containing the as many elements as the total number of 
    //       initialized elements of g_LookupTable, composed of cc2 and the related
    //       HMS value. Should be used as argument to maps.series.regions[0].setValues()
    ColorByHMS = function(){
        var data = {},
            key,
            isFound,
            min,
            max;

        $.when(GetHMS(g_StatID,g_HMSYear)).done(function(hmsData){
            isFound = false;
            min = Number.MAX_VALUE;
            max = Number.MIN_VALUE;
            SetHMS(hmsData[g_StatID]);     // Need to index in due to JSON format of by_stat.php
            // iterate through regions by key
            for (key in map.regions) {
                // iterate through lookup table by index
                for (var i = 0; i < g_LookupTable.length && isFound == false; i++)
                {
                    // set value by key if key is equal to cc2 in lookup table
                    if (key === g_LookupTable[i][0] && g_LookupTable[i][2] != -1)
                    {
                        data[key] = g_LookupTable[i][2];
                        if (data[key] < min)
                            min = data[key];
                        if (data[key] > max)
                            max = data[key];
                        isFound = true;
                    }
                    else
                    {
                        data[key] = -1;
                    }
                }
                isFound = false;
            }
            
            map.series.regions[0].params.min = min;
            map.series.regions[0].params.max = max;
            map.series.regions[0].setValues(data);
        });
    }

    map = new jvm.Map(
    {
        map: 'world_mill_en',
        container: $('#map'),
        regionsSelectable: true, // allows us to select regions
        backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: '#999999',
                "stroke-width": 0.2,
                stroke: '#112211'
            },
            hover: {
                "fill-opacity": 0.7
            },
            selected: {
                "stroke-width": 0.4,
                stroke: '#000000',
                fill: '#7FDBFF'
            }
        },
        series: {
            regions: [{
                attribute: 'fill',
                // needs some random init values, otherwise dynamic region coloring won't work
                values: { ID: 148576, PG: 13120.4, MX: 40264.8, EE: 78.6, DZ: 30744.6, MA: 24344.4, MR: 14117.6, SN: 39722.6, GM: 7832.6, GW: 9902.2 },
                scale: ['#22FF70', '#1D7950'],
                normalizeFunction: 'polynomial'
            }]
        },
        // runs when a region is selected
        onRegionSelected: function()
        {
            if (g_Clear != true)
                ModifyData(map.getSelectedRegions());
        },
        // runs when region is hovered over
        onRegionTipShow: function(e, label, key){
            var tipString = "";
            tipString += label.html()+' (';
            if (map.series.regions[0].values[key] != -1)
            {
                tipString += g_StatList[g_StatID]+' - '+map.series.regions[0].values[key];
            }
            else
            {
                tipString += 'No Data Available';
            }
            tipString += ')';
            label.html(tipString);
        }
    });
    // after lookup table is loaded, color map
    setTimeout(function(){
        var isFound = false;
        g_CountriesNoData = new Array();
        for (var key in map.regions) 
        {
        	isFound = false;
            // iterate through lookup table by index
            for (var i=0; i<g_LookupTable.length && !isFound; i++)
            {
                // set value by key if key is equal to cc2 in lookup table
                if (key == g_LookupTable[i][0])
                {
                    isFound = true;
                }
            }
            if(!isFound)
            {
	        	g_CountriesNoData.push(key);
	        }
	            
        }
        console.log(g_CountriesNoData);
        
    }, 1000);
    // clearing selected regions when the "clear" button in clicked
    document.getElementById("clear").onclick = function()
    {
        var parentTabDivName = "id-"+g_StatList[g_StatID]+"-graphs";
        // removes graphs subdivs
        document.getElementById(parentTabDivName).innerHTML = "";
        // removes map selections

        g_DataList.size = 0;
        g_DataList.start = null;
        g_DataList.end = null;

        g_Clear = true;
        map.clearSelectedRegions();
        g_Clear = false;
    }
});
