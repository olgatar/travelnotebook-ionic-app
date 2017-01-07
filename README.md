# TravelNotebook
TravelNotebook is a similar to blog application that allows the users to keep track on their travels by creating, editing and deleting the travel posts with uploaded images. TravelNotebook built with [Apache Cordova](https://cordova.apache.org), [Ionic Framework](https://ionicframework.com/docs/), [Firebase](https://firebase.google.com/) as backend and npm
[angular-base64-upload module](https://github.com/adonespitogo/angular-base64-upload) (for app to run in web browser).

## How to build & run

1. Clone or Download the following GitHub project to you local machine:

	git clone https://github.com/olgatar/travelnotebook-ionic-app.git

2. Go to travelnotebook-ionic-app project folder in your terminal:

	cd travelnotebook-ionic-app

3. Install Cordova and Ionic globally (if not already installed):

	npm install -g cordova ionic

4. Install npm packages:

	npm install

5. Add target platform (for mobile device application):

  ionic platform add [android/ios]

6. Additionally install cordova-plugin-camera (for mobile device application:

  cordova plugin add cordova-plugin-camera

7. To run in browser with Gulp:

  1. gulp serve
	2. open http://localhost:3000/ in browser

8. To run in browser with Ionic:

	  ionic serve

--------------

To just build:

	ionic platform build [android/ios]

To run in mobile emulator:

	ionic emulate [ios/android]

To run on mobile device:

	ionic run [ios/android]

To release build signed .apk(Android) or .ipa(IOS):

  cordova build [android/ios] --device --release --buildConfig=build-release.json

To publish app on Google Play Store or Apple Store:

  1. Prepare app meta data and image assests
	2. Publish

## Important folders and files

* `config.xml` - main Cordova config.
* `www/` - HTML/CSS/JavaScript files.
* `res/` - Icon, splash screen and other image assets.

## Who made this

Created in 2016 by [Olga Tarassova](https://github.com/olgatar).
