var Calendar = window.Calendar || {};
var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];;
var date = new Date();

var currMonth = months[date.getMonth()];
var currDay = date.getDate();


var today = new Date().toISOString().substr(0, 10);
document.querySelector("#date").value = today;

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
			var dateFinal = dateFull.toString();
			const eventInfo = {
				eventName,
				date,
				category,
				location: place,
				dateFinal 
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
