# TravelNotebook
TravelNotebook is a mobile app build with [Cordova](https://cordova.apache.org), [Ionic Framework](https://ionicframework.com/docs/), [Firebase](https://firebase.google.com/) as an API server and npm
[angular-base64-upload module](https://github.com/adonespitogo/angular-base64-upload) (for app to run in web browser).

## How to build & run

1. Install Cordova and Ionic globally:

	npm install -g cordova ionic

2. Install npm packages:

	npm install

3. Install gulp-connect for app development (optional):

  npm install gulp-connect --save

4. Add target platform (for app to function as a mobile device application):

  ionic platform add [android/ios]

5. To run app on Android, addtionally install cordova-plugin-camera:

  ionic platform add [android/ios]

To run with gulp:

  1. gulp serve
	2. open http://localhost:3000/ in browser

To just build:

	ionic platform build [android/ios]

To run in browser:

  ionic serve

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
