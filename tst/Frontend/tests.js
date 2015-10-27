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
					 

QUnit.log( function( details )  {
	console.log( "Log: ", details.actual, details.message );
});