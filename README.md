# TraveNotebook
TravelNotebook is a mobile app build with [Cordova](https://cordova.apache.org) and [Ionic Framework](https://ionicframework.com/docs/) and [Firebase](https://firebase.google.com/) as an API server.

## How to build & run

Install Cordova and Ionic globally:

	npm install -g cordova ionic

Add target platform:

  ionic platform add [android/ios]

Just build:

	ionic platform build [android/ios]

Run in browser:

  ionic serve

Run in emulator:

	ionic emulate [ios/android/browser]

Run on device:

	ionic run [ios/android/browser]

Release build signed .apk(Android) or .ipa(IOS):

  cordova build [android/ios] --device --release --buildConfig=build-release.json

## Important folders and files

* `config.xml` - main Cordova config.
* `www/` - HTML/CSS/JavaScript files.
* `res/` - Icon, splash screen and other image assets.

## Who made this

Created in 2016 by [Olga Tarassova](https://github.com/olgatar).
