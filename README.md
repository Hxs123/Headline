# Headline
Article Summarizing Android App

# Getting Started

Easy Way:

To run the app (This is an Android app), you can just get the apk from this
repo and install it on the device.

Or Hard Way (To get access to the code and see changes immediately):

Follow the Facebook React-Native tutorial
- [Getting Started guide](http://facebook.github.io/react-native/docs/getting-started.html) to install React Native and its dependencies.

You need to install react-native and watchman

**If you are running Linux, watchman can be annoying. You'll need to increase the number of inotify watches!!**

> echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

## Running the App

Make sure to have all Android [prerequisites](https://github.com/facebook/react-native/tree/master/ReactAndroid#prerequisites) (SDK, NDK) installed.

Make sure to run this before runnning the app

> git clone https://github.com/Hxs123/Headline.git
> cd Headline
> npm install

To run on a virtual device, start the device
> android avd	
and then type,
> cd (wherever you saved this repo i.e. react-native/Headline)
> react-native start
> react-native run-android

See [Running on Device](https://facebook.github.io/react-native/docs/running-on-device-android.html) for physical android devices.

# Functionality

The app is fairly straight forward, just type (or preferably copy/paste)
the URL of the article you want to summarize into the text field on the 
main page. Hit submit and a new screen will show you the article's text
in its entirety. Navigation appears at the top of the screen with buttons
to go to the summary of the article or to return to the main screen. The
summary screen presents a summary of the article. Also on the main screen,
there are links to sample news articles for quickly testing the use of the
app without having to find a URL and paste it into the input field.

# Features for the future

If I were to continue working on this project, I would like to make it more
attractive visually. The IOS version of react-native has some really nice
css-like styling that isn't as prevalent in the Android version,, so I 
would need to invest extra time in making it look good. Also I would like 
to make it so that the app could be launched externally (like in browser)
and it would parse the URL and bring up a summary.

# About Project

This project is made with the intention of being used for the Capitial One
Coding Challenge for entry into the summit during the summer of 2016.

The main goal of the project is to create a mobile app that will take an
article and provide a summary for that article. 

I decided to use Facebook's react-native for this project because it is
a technology that makes creating native mobile apps much easier. This was
my first time using this specific framework, so I faced the challenge of 
learning react-native while also trying to implement the solution to the
challenge. React-Native is influenced heavily by Facebook's React, a 
framework for writing websites. I have used React a little bit before, but
it wasn't enough to make coding in react-native feel like anything less than
a new experience.

My first priority for this project was functionality (i.e. can I get something
that will work?). So, I quickly went through the tutorial on the react-native
website. It was a little light, but it provided enough information to work
with. Then came the installation, and as you might see above this section in
the getting started, it was a bit of a nightmare for me. But eventually I had
a running virtual device and went along coding. In the end I think the project
doesn't appear to be visually attractive, but my main intention was to get the
article summary to work. For that, I used the Aylien text processor and sent
HTTP requests to them in order to recieve JSON responses.

Overall I had a bunch of fun while doing this project and feel as though I 
learned a lot about both react-native and react. Also I learned much more
about the Linux operating system while I was trying to figure out how to 
install everything.

Anyways, I would like to thank Facebook and Aylien for providing me with the
tehcnology necessary to make this app.

And special thanks to Capital One for providing me with this challenge and
giving me the opportunity to compete for a spot in their summit.


Peace,
Hector Solis 