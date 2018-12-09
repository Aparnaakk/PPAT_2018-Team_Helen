/*global Calendar _config*/

var Calendar = window.Calendar || {};
var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];;
var date = new Date();

var currMonth = months[date.getMonth()];
var currDay = date.getDate();

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

$('#date').val(new Date().toDateInputValue());
//var today = new Date().toISOString().substr(0, 10);
//document.querySelector("#date").value = today;


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
                first
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
            } else {
				console.log("PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2));
				// trigger the sucess handler
				handleSaveSuccess();	
            }
        });
	}
}(jQuery));
