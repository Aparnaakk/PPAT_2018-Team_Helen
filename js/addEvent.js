/*global Calendar _config*/

var Calendar = window.Calendar || {};
var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];;
var date = new Date();

var currMonth = months[date.getMonth()];
var currDay = date.getDate();

$(document).ready(function(){

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

$("#myModal").hide();
$("#myModal2").hide();
$("#OKbutt").click(function(){
	$("#myModal2").hide();
})

$('#date').val(new Date().toDateInputValue());


$('#durUP').click(up30);
$('#durDOWN').click(down30);
$('#timeUP').click(upTime);
$('#timeDOWN').click(downTime);
$('#dateUP').click(upDate);
$('#dateDOWN').click(downDate);


console.log($('#startTime').val());
console.log('datehere', $('#date').val());

function upDate() {

	
	var currentDate = $('#date').val();
	var DateArray = currentDate.split("-");
	var year = Number(DateArray[0]);
	var month = Number(DateArray[1]);
	var day = Number(DateArray[2]);

	console.log('year', year);
	console.log('month', month);
	console.log('day', day);

	if ( day === 31 && month === 12) {
		day = 1;
		month = 1;
		year += 1;
	}
	else if (day === 31 && month < 12) { 
		month += 1;
		day = 1; 
	} 
	else if ( month === 12 && day < 31) { day += 1; }
	else if ( month < 12 ) { day += 1; }

	if (day < 10) { day = '0' + day; }
	if (month < 10) { month = '0' + month; }

	var newYear = year.toString();
	var newMonth = month.toString();
	var newDay = day.toString();
	var newDate = newYear + '-' + newMonth + '-' + newDay;
	console.log(newDate);
	$('#date').val(newDate);
}

function downDate() {

	var currentDate = $('#date').val();
	var DateArray = currentDate.split("-");
	var year = Number(DateArray[0]);
	var month = Number(DateArray[1]);
	var day = Number(DateArray[2]);

	console.log('year', year);
	console.log('month', month);
	console.log('day', day);
	if ( day === 1 && month === 1) {
		day = 31;
		month = 12;
		year -= 1;
	}
	else if ( month === 1 && day > 1) { day -= 1; }
	else if ( [5,7,10,12].includes(month) && day === 1 ) { 
		month -= 1;
		day = 30; }
	else if ( [2,4,6,8,9,11].includes(month) && day === 1 ) { 
		month -=1
		day = 31; }
	else if ( month === 3 && day === 1) { 
		month = 2;
		day = 28; }
	else if ( month > 1 ) { day -= 1; }


	//adjust formating of single digits
	if (day < 10) { day = '0' + day; }
	if (month < 10) { month = '0' + month; }

	var newYear = year.toString();
	var newMonth = month.toString();
	var newDay = day.toString();
	var newDate = newYear + '-' + newMonth + '-' + newDay;
	console.log(newDate);
	$('#date').val(newDate);
}

function upTime() {

	var currentTime = $('#startTime').val();
	var TimeArray = currentTime.split(":");
	var hour = Number(TimeArray[0]);
	var min = Number(TimeArray[1]);
	console.log('hour', hour);
	if (min === 45 && hour < 23) { 
		hour += 1;
		min = '00'; 
	} 
	else if ( hour === 23 && min < 45) { min += 15; }
	else if ( hour < 23 ) { min += 15; }

	if (hour < 10) { hour = '0' + hour; }
	var newHour = hour.toString();
	var newMin = min.toString();
	var newTime = newHour + ':' + newMin;
	$('#startTime').val(newTime);
}

function downTime() {

	//get current time input
	var currentTime = $('#startTime').val();
	console.log("before", currentTime);
	var TimeArray = currentTime.split(":");
	var hour = Number(TimeArray[0]);
	var min = Number(TimeArray[1]);

	// adjust the time based on half hour
	if (hour > 0 && min === 0) { 
		hour -= 1;
		min = '45'; 
	}
	else if (min === 15) { min = '00'} 
	else if ( hour === 0 && min > 15 ) { min -= 15; }
	else if ( hour > 0 ) { min -= 15; }

	//prep low numbers for '00' format
	if (hour < 10) { hour = '0' + hour; }
	var newHour = hour.toString();
	var newMin = min.toString();

	//set new time
	var newTime = newHour + ':' + newMin;
	$('#startTime').val(newTime);
}

function up30() {
	var durNow = Number($('#duration').val());
	if (durNow < 180) {
		var newDur = durNow + 30;
		var upDated = newDur.toString();
		$('#duration').val(upDated);
	}
}

function down30() {
	var durNow = Number($('#duration').val());
	if (durNow > 0) {
		var newDur = durNow - 30;
		var upDated = newDur.toString();
		$('#duration').val(upDated);
	}
}

// DropDown constructor
function DropDown(el) {
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.dropdown > li');
	this.val = '';
	this.index = -1;
	this.initEvents();
}

DropDown.prototype = {
	initEvents : function() {
		var obj = this;

		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			return false;
		});

		obj.opts.on('click',function(){
			var opt = $(this);
			obj.val = opt.text();
			obj.index = opt.index();
			obj.placeholder.text(obj.val);
		});
	},
	getValue : function() {
		return this.val;
	},
	getIndex : function() {
		return this.index;
	}
};


(function addEventScopeWrapper($) {
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


    //all the dropdown functions
	$(function() {

		var dd = new DropDown( $('#Type') );
		
		$(document).click(function() {
			// all dropdowns
			$('.wrapper-dropdown-3').removeClass('active');
		});

	});

	

	$("#subButton").click(newEvent);

	function newEvent() {
		// calendar event info from the user (added defaults for category and duration until dropdown fix)
		const eventName = $("#name").val();
		const date = $("#date").val();
		const category = $("#CategoryLabel").text();
		const place = $("#place").val(); 
		var startTime = ($("#startTime").val());
		const duration = $("#duration").val();

		const eventBlocks = Number(duration)/30;
		
		var dateFull = new Date(date);
		console.log(dateFull);

		
		var newTimeArray = startTime.split(":")
		console.log(newTimeArray[0])
		console.log(newTimeArray[1])
		dateFull.setHours(newTimeArray[0], newTimeArray[1]);
		console.log("this is before iteration:", dateFull);
		//var timeadded = ;
		//console.log(timeadded)
		//SimpleDateFormat df = new SimpleDateFormat("HH:mm");

		// replace with your start date string
		//Date d = df.parse("2008-04-16 00:05:05");
		//Long time = d.getTime();
		//time +=(2*60*60*1000);
		//Date d2 = new Date(time);
		
		for (i = 0; i < eventBlocks; i++){
			// consolodate and transform the event info
            if(i == 0) {
                first = 1;
            } else {
                first = 0;
            }
			var dateFinal = dateFull.toString();
			const eventInfo = {
				eventName,
				date,
				category,
				location: place,
				dateFinal,
				first,
				duration,
				startTime,
			};

			console.log('Event Info: ', eventInfo);

			// get the userId bound to the event
			const userId = Calendar.user.getUsername();

			// generate the UUID of the event
			const eventId = guid();

			// store the event in DynamoDb
			saveCalendarEvent(userId, eventId, eventInfo, handleSaveSuccess);
			
			dateFull.setMinutes(dateFull.getMinutes()+30);
			console.log(dateFull);
		}
		
	}



	function handleSaveSuccess() {
		// on a sucessful save, all we need to do is navigate back to the calendar
		window.location.href = 'index.html';
	}

    function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function saveCalendarEvent(userId, eventId, eventInfo, handleSaveSuccess) {
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:8ffe81c4-51bd-4dc7-84aa-0a2403321861',
            Logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_g6aFMGSka': authToken,
            },
        });

        var docClient = new AWS.DynamoDB.DocumentClient();
        
        var params = {
            TableName :"CalendarEvents",
            Item: {
                userId,
                eventId,
                eventInfo,
            }
        };

        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to put item: " + "\n" + JSON.stringify(err, undefined, 2));
                $("#myModal2").show();

            } else {
            	
				console.log("PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2));
				// trigger the sucess handler
				$("#myModal").show();
				setTimeout(handleSaveSuccess, 3000);	
            }
        });
	}
}(jQuery));
});
