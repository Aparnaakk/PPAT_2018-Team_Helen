# PPAT_2018-Team_Helen

This is web calendar made for the Fall 2018 MIT PPAT Team Helen. It is a customizable, minimalistic calendar for older people and people with visual impairments. It allows an user to:
* View events in a weekly view with a particular colour assigned to a particular type of event
* View each event individually 
* Add and delete events

<img src="./helen.JPG" width="300">

## Set up

If you would just like to use the calendar app:

1. Go to:
https://owa.exchange.mit.edu/owa/redir.aspx?C=-GWqzNztvX_D8VL3BWEnavrf8VVLNFHMMPBPebipyZ5-7wwLxV7WCA..&URL=http%3a%2f%2fhelen-calendar.s3-website-us-east-1.amazonaws.com%2fsignin.html
2. Register using your email
3. Verify your email using the verification code sent to your email
4. Sigin to your account
5. The calendar is now ready to use!

If you would like to customize/edit the app:

1. Git clone and download this repository
2. Download the project file contents as a ZIP file then unzip it locally.
3. Run the 'signup.html' file 
4. Register to use the app through your email
5. After registering, sign-in to your app using the details sent to your email through the ‘signin.html’ file again.
6. The calendar is now ready to use and edit!

7. Additionally, to link the locally downloaded web-app to an amazon s3 bucket, follow this tutorial : https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html

## App Overview
This app consists of three main pages: 
1. The sign-in page (signin.html) that takes care of registering new users and allows current users to sign-in.
2. The main calendar week view (index.html that is linked to createCalendar.js).
3. The add event page (addEvent.html that is linked to addEvent.js) that takes care of storing and adding events to the calendar. 
4. The view event page (viewevent.html and viewevent.js) that takes care of the individual, in detail view of every event.

## Authors
1. Matt Wu
2. Emma Stone
3. Aparna Krishnakumar

## Acknowledgement
We would like to thank the entire PPAT team for their mentoring and support.
