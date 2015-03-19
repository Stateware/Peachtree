// File Name:               lookup_table.js
// Description:             Generates lookup table
// Date Created:            3/5/2015
// Contributors:            Emma Roudabush, Vanajam Soni
// Date Last Modified:      3/19/2015
// Last Modified By:        Emma Roudabush
// Dependencies:            descriptor.php, data.js
// Additional Notes:        N/A

function CreateLookupTable ()
{
    GetDescriptor();
	console.log(g_DescriptorJSON);
    GenerateLookupTable();
    GenerateStatReferenceList();
	console.log(g_StatList); 
	console.log(g_LookupTable);
}

function GetDescriptor ()
{
	$.ajax({                                      
		url: 'http://usve74985.serverprofi24.com/API/descriptor.php',                                                     
		dataType: 'JSON',                 
		async: false,
		success: function(data){     
			console.log("Successfully received descriptor.php");
			g_DescriptorJSON = data;
		} 
	});
}

function GenerateLookupTable()
{
    g_LookupTable = new Array(g_DescriptorJSON.cc2.length);
    for (i = 0; i < g_DescriptorJSON.cc2.length; i++)
    {
		g_LookupTable[i] = new Array(3);
        g_LookupTable[i][0] = g_DescriptorJSON.cc2[i];
        g_LookupTable[i][1] = g_DescriptorJSON.common_name[i];
        g_LookupTable[i][2] = 0;
    }
}

function GenerateStatReferenceList()
{
	g_StatList = []; 
	for (i = 0; i < g_DescriptorJSON.stats.length; i++)
	{
		g_StatList[i] = g_DescriptorJSON.stats[i];
	}
}

function GetCID(cc2)
{
	// Assumptions:
	// 1. the name of the table is "lookUpTable"
	// 2. cc2 array is sorted 
	var cids = new Array();
	var lookUpIndex = 0;
	
	for(var currentCc2 in cc2)
	{
		while(currentCc2 > g_LookupTable[lookUpIndex][1]) 
		{
			lookUpIndex++;
		}
		
		if(currentCc2 == g_LookupTable[lookUpIndex][1])
		{
			cids[cids.length] = lookUpIndex;
		}
		lookUpIndex++;
	
	}
	
	return cids;	
}

