QUnit.module("Init Phase Tests", {
	beforeEach: function(assert) {
		initPage();
	}
});
QUnit.test( "GetInitialYears Test", function( assert ) {
	//generic test
	var descriptorTest = {
							yearRange : [1900,2000]
						 };
	var yearRange = {
						FirstYear : 1900,
						LastYear  : 2000
					};			
						 
	assert.deepEqual( GetInitialYears(descriptorTest), yearRange );
});

QUnit.test( "SetGraphType Test", function( assert ) {
	//set global to input
	var type = "heyo";		
	SetGraphType(type);					 
	assert.equal( type, g_GraphType );
});

QUnit.test( "InitializeLookupTable Test", function( assert ) {
	//generic test
	
	var descriptorTest = {
							cc2 : [1,2,3,4,5,6,7,8,9,10],
							common_name : ["one","two","three","four","five","six","seven","eight","nine","ten"]
						 };
						 
	var output=[[1,"one",0],
				[2,"two",0],
				[3,"three",0],
				[4,"four",0],
				[5,"five",0],
				[6,"six",0],
				[7,"seven",0],
				[8,"eight",0],
				[9,"nine",0],
				[10,"ten",0]];
					 
	assert.deepEqual( InitializeLookupTable(descriptorTest), output );
});

QUnit.test( "GenerateStatReferenceList Test", function( assert ) {
	//generic test

	var descriptorTest = {
							stats : ["one","two","three","four","five","six","seven","eight","nine","ten"]
						 };
						 
	var output= ["one","two","three","four","five","six","seven","eight","nine","ten"];
					 
	assert.deepEqual( GenerateStatReferenceList(descriptorTest), output );
});


QUnit.test( "ParseStatList Test", function( assert ) {
	//generic test

	g_StatList = ["Births", "Deaths", "Reported Cases", "Population", "MCV1-VACCL", "Estimated Mortality", "MCV2-VACCL",
					"Estimated Cases - Upper Bound", "Estimated Cases", "Estimated Mortality - Upper Bound",
	 				"Estimated Mortality - Lower Bound", "Estimated Cases - Lower Bound", "SIA-VACCB"];
	
	var output= [ 	[0,0,0,0,0,0,1],
					[0,1,8,5,3,2,12],
					[-1,-1,11,10,-1,-1,4],
					[-1,-1,7,9,-1,-1,6] 
				];
					 
	assert.deepEqual( ParseStatList(), output );
});


QUnit.test( "Update Input test", function (assert) {
	var tempSettings = [1980, 2012, 2012, 0, 1];
	assert.deepEqual(UpdateInputs(),tempSettings);
});
					 

QUnit.test( "Test GetCountryDataArray", function (assert) {
	var g_cache testCache = new data_cache();

	testData = new Array(2);
	testData[0] = new Array(8);
	testData[0][0] = 55;
	testData[0][1] = 58;
	testData[0][2] = 60;
	testData[0][3] = 62;
	testData[0][4] = 57;
	testData[0][5] = 56;
	testData[0][6] = 55;
	testData[0][7] = 52;
	testData[1] = new Array(8);
	testData[1][0] = 25;
	testData[1][1] = 28;
	testData[1][2] = 30;
	testData[1][3] = 32;
	testData[1][4] = 27;
	testData[1][5] = 26;
	testData[1][6] = 25;
	testData[1][7] = 22;`

	//Stat 0, Year 1990-1997
	g_cache.get(0).get(0).get(0).get(0).get(1990) = testData[0][0];
	g_cache.get(0).get(0).get(0).get(0).get(1991) = testData[0][1];
	g_cache.get(0).get(0).get(0).get(0).get(1992) = testData[0][2];
	g_cache.get(0).get(0).get(0).get(0).get(1993) = testData[0][3];
	g_cache.get(0).get(0).get(0).get(0).get(1994) = testData[0][4];
	g_cache.get(0).get(0).get(0).get(0).get(1995) = testData[0][5];
	g_cache.get(0).get(0).get(0).get(0).get(1996) = testData[0][6];
	g_cache.get(0).get(0).get(0).get(0).get(1997) = testData[0][7];

	//Stat 1, Year 1990-1997
	g_cache.get(0).get(0).get(0).get(1).get(1990) = testData[1][0];
	g_cache.get(0).get(0).get(0).get(1).get(1991) = testData[1][1];
	g_cache.get(0).get(0).get(0).get(1).get(1992) = testData[1][2];
	g_cache.get(0).get(0).get(0).get(1).get(1993) = testData[1][3];
	g_cache.get(0).get(0).get(0).get(1).get(1994) = testData[1][4];
	g_cache.get(0).get(0).get(0).get(1).get(1995) = testData[1][5];
	g_cache.get(0).get(0).get(0).get(1).get(1996) = testData[1][6];
	g_cache.get(0).get(0).get(0).get(1).get(1997) = testData[1][7];

	var result = GetCountryDataArray(0, 0, 0);
	assert.deepEqual(result, testData);
});

QUnit.log( function( details )  {
	console.log( "Log: ", details.actual, details.message );
});
