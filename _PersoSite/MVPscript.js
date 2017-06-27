var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var year = 2016;
var matches = [];
var searchInput = "";
var spinnerDates = [];
var matchedDates = [];
var allArticles = [];
var apiKey = "cf5tji7dlgvo3mh6";
var url = "";
var spinnerString = "";
var allMonth = [];//holds all data returned from Trove. Reused to cycle through new articles.
var allMonthDupe = [];
var chosenArticle=[];
var dayCounter = 0;
var iframePdf = "";
var compareHeadingArray = [];
var compareCounter = 1;
var dupeArray = [];
var dupeCounter = 0;


	$(document).ready(function(){
		calcDay();
		displayDate(date);
		
		$("form#changePic").submit(function() {//do i need prevent...

			var cult = $("input:checkbox:checked#cult").val();
			var apocalypse = $("input:checkbox:checked#apocalypse").val();
			var war = $("input:checkbox:checked#war").val();
			searchInput = "end%20of%20the%20world%20";
			


			
			if (war == "on"){
				searchInput = searchInput+"war%20";
			}
			if (cult == "on"){
				searchInput = searchInput+"cult%20";
			}
			if (apocalypse == "on"){
				searchInput = searchInput+"apocalypse%20";
			}
			
			
			var urlSearch = searchInput;
			console.log(urlSearch);
			newsURL(urlSearch);
			
			$("#test").fadeTo(3000, 0.001, function(){
				//
			});
			
			$("div#loading").fadeIn("slow").html("<p><h4>LOADING</h4></p>");
			
			$.getJSON(url, function(data){
				//PUT IN DUMMY CALL
				if(data.response.zone){ //if it has a response
					
					
					allMonth = data.response.zone[0].records.article // --> need to remove dupes from allMonth for display --> use each
					$.each(allMonth, getHeadings); //IT WORKS --> need function to compare heading with all headings --> for loop
					$.each(allMonth, checkDupes);
					
					console.log(dupeArray);
					
					
					
					$("#test").remove();
					$("div#loading").fadeIn("slow").html("<p>TROVE TEST</p>");
					
					$.each(allMonthDupe, checkDate); //checks date for each 
					
					
					while(matchedDates.length == 0 ){ //if there are no matched dates
						increaseDay();
						$.each(data.response.zone[0].records.article, checkDate);
					};
					if (dayCounter > 0){
						quickAnimation(dayCounter.toString());
						displayDate(date);
					}
					
					//if matched dates is empty --> matchedDates = allArticles. Therefore need to remove dupes from ALL articles!!
					chosenArticle = matchedDates[0];
					matchedDates.shift();
					
					

					
					
					
					displayArticle(chosenArticle);
					$("#nextArticle").css("visibility","visible");
					$("#nextArticle").css("display","inline");
					
					$("#backArticle").css("visibility","visible");
					$("#backArticle").css("display","inline");
					
					

				}
				else{
					$("div#loading").fadeIn("slow").html("<p> !!!NO RESULTS FOUND, PLEASE CHANGE SEARCH!!! </p>");
				}
			});
		});
		
		
	});
	
	$( "#nextArticle" ).mouseenter(function() {
		$( "#nextArticle" ).html( "<img src='img/arrowNext2.png' id='arrow'>" );
	});
	$( "#nextArticle" ).mouseleave(function() {
		$( "#nextArticle" ).html( "<img src='img/arrowNext.png' id='arrow'>" );
	});
	
	$( "#backArticle" ).mouseenter(function() {
		$( "#backArticle" ).html( "<img src='img/arrowBack2.png' id='arrow2'>" );
	});
	$( "#backArticle" ).mouseleave(function() {
		$( "#backArticle" ).html( "<img src='img/arrowBack.png' id='arrow2'>" );
	});
	
	$("#nextArticle").click(function(){
		var i =0;
		console.log("next article clicked");
		if (matchedDates.length != 0){
			displayNextArticle();
		}
		else{
			if(matchedDates.length == 0){ //if matched dates still has nothing in it!!! return HOME
				$(".panel").remove();
				//$("#nextArticle").css("visibility","hidden");
				$(".output").html("<p class='panel'> ALL OUT OF ARTICLES <br>PLEASE GO BACK HOME BY CLICKING THE ABOVE LOGO AND TRY ANOTHER SEARCH</p>");
			};
			matchedDates = allMonth;
			displayNextArticle();
			
		}
		
		
	});
	
function displayNextArticle(){
	displayArticle(matchedDates[0]);
	matchedDates.shift();
}	
function displayDate(submittedDate){
	$("p#todaysDate").html("THE DATE IS:   "+submittedDate);
}
function quickAnimation(text){
	$("#frame").fadeIn("slow").append("<p class = 'panel'>FASTFORWARD<br> "+text+" <br>DAYS</p>");
}
function increaseDay(){
	day = parseInt(day);
	day++;
	dayCounter++;
	if (day == 31){
		console.log("day over 31");
		day = 1;
	}
	calcDay();
}
function randomNumber(limit){
	return Math.floor(Math.random()*limit);
}
function displayArticle(array){
	
	var dateArray2 = [];
	
	var allArticles = array;
	var heading = (allArticles.heading);
	var articleFull = (allArticles.articleText);
	var dateOfArt = (allArticles.date);
	var articleURL = (allArticles.troveUrl);
	var articleSnippet = (allArticles.snippet);
	var articlePdf = allArticles.pdf;
	var articlePublication = allArticles.title.value;
	var articleFullDate = allArticles.date;
	
	dateArray2 = articleFullDate.split('-');
	var articleDay = dateArray2[2];
	day = articleDay;
	calcDay();
	console.log("WITHIN display article "+date);

	while (articlePdf.length < 20){
	
		articlePdf = articlePdf[0];
	}
	
	$(".panel").fadeOut(1000);
	$(".pdfContainer").slideUp(1000);
	
	displayDate(date);
	
	$(".output").fadeIn(5000).append("<div class= 'panel'><p class='doubleFont'>"+heading+"</p>"+dateOfArt+"<br>"+articlePublication+"<br><a href="+articleURL+">LINK TO TROVE WEBSITE</a></div><div class = 'pdfContainer'><iframe src="+articlePdf+ " allowfullscreen>PLEASE INSTALL A BROWSER THAT SUPPORTS IFRAMES</iframe></div>");
	
	
}
function calcDay(){
	/* var d = new Date();
	day = d.getDate();
	month = d.getMonth()+1; */
	
	month = ("0" + month).slice(-2); //makes double
	day = ("0" + day).slice(-2);
	date= year+'-'+month+'-'+day;
}
function newsURL(searchTerm){
	var searchZone = "newspaper";
	var toSearch = searchTerm; //used for now with no extra input
	
	url = "http://api.trove.nla.gov.au/result?key="  //Standard trove search
			+ apiKey + "&encoding=json&zone=" + searchZone 
			+ "&q=" + toSearch 
			+ "&l-month=" + month
			+ "&include=articleText&reclevel=full"
			+ "&callback=?";
	console.log(url);
}
function spinnerPrint(arrayOfSpinner){
	var lenSpinner = 0;
	lenSpinner = arrayOfSpinner.length;
	
	for (n=0; n < lenSpinner; n++){
		spinnerString = arrayOfSpinner[n]+", "+spinnerString;
	};
	$("div#loading").html("<p> SPINNER DATES:  "+spinnerString+"</p>");
	
}
function checkDate(index, item){
	var dateArray = [];
	var articleDate = item.date;
	var articleHead = item.heading;
	var compareCounter = 1;
	var indexOfDupe = [];
	

	
	dateArray = articleDate.split('-');
	
	if (dateArray[2] == day){
		spinnerDates.push(dateArray[0]);
		matchedDates.push(item); 
	}

}

function checkDupes(index, item){ // need to make every! like compare dates. to be used first to remove any coppies than date matched
	var articleHeading = item.heading; // need to make a function to make an array with all titles!
	var arrayTORemove = allMonth;
	
	var i = index+1;
	
	
	
	for(; i != index; i++){ //counts through allArticles starting from the next position on from self --> untill gets to self
		console.log(i);
		
			if (articleHeading != dupeArray[i]){
				allMonthDupe.push(item);
				break;
			}
			else { //item is duplicate! need to remove!
				console.log("FOUND DUPE = " + articleHeading);
				console.log("Dupe I = "+i);
				dupeArray.push(articleHeading); //have an array full of headings that are dupes dupeArray
				
			
			}

		if(i > compareHeadingArray.length){
			console.log("about to go back to 0");
			i =0;
		}
		
	}
	
	
}
function getHeadings(index, item){
	var headingToAdd = item.heading;
	compareHeadingArray.push(headingToAdd);
	
}
