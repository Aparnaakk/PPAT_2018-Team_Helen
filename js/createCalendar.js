
var Calendar = window.Calendar || {};
Calendar.map = Calendar.map || {};
var months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
var days = ["SUN","M","T","W","Th","F","SAT"];
var d = new Date();
var viewYear = d.getFullYear();
var viewMonth = d.getMonth();
var viewDay = d.getDate();
var viewDayOfWeek = d.getDay();
var viewDate = new Date(viewYear, viewMonth, viewDay);
var viewStartDate = new Date(viewDate.getTime() - viewDayOfWeek * 86400000);
var viewEndDate = new Date(viewStartDate.getTime() + 6 * 86400000);
currMonth = months[viewMonth];


// confirm that the user is authenticated, or redirect to sign-in
Calendar.authToken.then(function setAuthToken(token) {
    if (token) {
        authToken = token;
    } else {
        window.location.href = '/signin.html';
    }
}).catch(function handleTokenError(error) {
    alert(error);
    window.location.href = '/signin.html';
});

/*
 *  Event Handlers
 */

$(function onDocReady() {

	$.getScript("js/moment.js", function() {
		setDays(viewStartDate);
	});
});

function setDays(dayOne) {
	console.log(dayOne)

    document.getElementById("day1").classList.remove("circle");
    document.getElementById("day2").classList.remove("circle");
    document.getElementById("day3").classList.remove("circle");
    document.getElementById("day4").classList.remove("circle");
    document.getElementById("day5").classList.remove("circle");
    document.getElementById("day6").classList.remove("circle");
    document.getElementById("day7").classList.remove("circle");

	viewStartDate = dayOne;
	viewEndDate = new Date(viewStartDate.getTime() + 6 * 86400000);
	var sun = dayOne;
	var mon = new Date(dayOne.getTime() + 1 * 86400000);
	var tues = new Date(dayOne.getTime() + 2 * 86400000);
	var wed = new Date(dayOne.getTime() + 3 * 86400000);
	var thurs = new Date(dayOne.getTime() + 4 * 86400000);
	var fri = new Date(dayOne.getTime() + 5 * 86400000);
	var sat = new Date(dayOne.getTime() + 6 * 86400000);

	document.getElementById("monthHeader").innerHTML = months[sun.getMonth()].concat(" ", sun.getFullYear());
	document.getElementById("day1").innerHTML = sun.getDate();
	document.getElementById("day2").innerHTML = mon.getDate();
	document.getElementById("day3").innerHTML = tues.getDate();
	document.getElementById("day4").innerHTML = wed.getDate();
	document.getElementById("day5").innerHTML = thurs.getDate();
	document.getElementById("day6").innerHTML = fri.getDate();
	document.getElementById("day7").innerHTML = sat.getDate();

    if(sun.getTime()===viewDate.getTime())
        document.getElementById("day1").classList.add("circle")
    if(mon.getTime()===viewDate.getTime())
        document.getElementById("day2").classList.add("circle")
    if(tues.getTime()===viewDate.getTime())
        document.getElementById("day3").classList.add("circle")
    if(wed.getTime()===viewDate.getTime())
        document.getElementById("day4").classList.add("circle")
    if(thurs.getTime()===viewDate.getTime())
        document.getElementById("day5").classList.add("circle")
    if(fri.getTime()===viewDate.getTime())
        document.getElementById("day6").classList.add("circle")
    if(sat.getTime()===viewDate.getTime())
        document.getElementById("day7").classList.add("circle")

	getCalendarEvents(viewStartDate, viewEndDate);
}

document.getElementById("arrow1").onclick = function() {setDays(new Date(viewStartDate.getTime() - 7 * 86400000))};
document.getElementById("arrow2").onclick = function() {setDays(new Date(viewStartDate.getTime() + 7 * 86400000))};

function getCalendarEvents(startDate, endDate) {
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:8ffe81c4-51bd-4dc7-84aa-0a2403321861',
        Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_g6aFMGSka': authToken,
        },
    });

    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName :'CalendarEvents',
	    KeyConditionExpression: 'userId = :vvv',
	    ExpressionAttributeValues: {
	    	':vvv': 'efstone96@gmail.com'
	    }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query item: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
			var items = data["Items"];
			// erase item before getting for new view
			for(i = 7; i < 20; i++) {
				for(j = 0; j < 7; j++) {
					tableCell1 = i.toString().concat("-",days[j]);
                    document.getElementById(tableCell1).innerHTML = "";                  
                    document.getElementById(tableCell1).style.backgroundColor = "#FFFFFF";
                    tableCell2 = i.toString().concat("5","-",days[j]);
					document.getElementById(tableCell2).innerHTML = "";					
					document.getElementById(tableCell2).style.backgroundColor = "#FFFFFF";
				}
			}

			for(i = 0; i < items.length; i++){
				var date = new Date(items[i].eventInfo.dateFinal);
				
				//get date for each stored event
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate() + 1;
				var hours = date.getHours();
				var minutes = date.getMinutes();
				eventDate = new Date(year, month, day);
				if(eventDate >= startDate && eventDate <= endDate) {
					tableDay = days[parseInt(((eventDate - startDate) / 86400000))];
					if((hours >= 7 && hours <= 20) && (minutes == 0 || minutes == 30)) {
                        if(minutes == 30) {
                            halfhour = "5"
                        } else {
                            halfhour = ""
                        }
						tableCell = hours.toString().concat(halfhour,"-",tableDay)
						if(items[i].eventInfo.first == 1) {
						  document.getElementById(tableCell).innerHTML = items[i].eventInfo.eventName;
                        }
						var category = items[i].eventInfo.category;
						if(category == "Spaulding") {
							document.getElementById(tableCell).style.backgroundColor = "#FFF990";
						} else if(category == "Physical Therapy") {
							document.getElementById(tableCell).style.backgroundColor = "#7FC97F";
						} else if(category == "Rowing") {
							document.getElementById(tableCell).style.backgroundColor = "#DF3C3C";
						} else if(category == "Sailing") {
							document.getElementById(tableCell).style.backgroundColor = "#39A1F3";
						} else if(category == "Community") {
							document.getElementById(tableCell).style.backgroundColor = "#FE843F";
						} else if(category == "Meeting") {
							document.getElementById(tableCell).style.backgroundColor = "#868686";
						} else if(category == "Doc Appt") {
							document.getElementById(tableCell).style.backgroundColor = "#A64F13";
						} else if(category == "Family") {
							document.getElementById(tableCell).style.backgroundColor = "#F5A8D4";
						} else if(category == "Vacation") {
							document.getElementById(tableCell).style.backgroundColor = "#8E4FE1";
						} else {
							document.getElementById(tableCell).style.backgroundColor = "black";
						}
					}
				}
			}
        }
    });
}

function handleSignOut() {
	Calendar.signOut();
}

