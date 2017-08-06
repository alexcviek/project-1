# project-1

My first full stack application - checking the forecast for Aurora Borealis occurrence. 

## How to install:

* Download or clone the repo
* ```yarn``` or ```npm i``` to install dependencies
* make sure your `mongod` is running in the background
* `gulp` to compile the source code and open in browser
* the app is deployed on [Heroku](http://peaceful-peak-78688.herokuapp.com/)

## Description

Well... I know just a few people who truly love winter. Seeing the northern lights, although is a beautiful experience, almost always requires you to get out of the cosy and warm home, to that unbelievable, hostile, frosty, cold environment awaiting outside. What a misery it is, when you spend half of the evening, freezing outside, in a hope for even half a glimpse and nothing is there! Ha - ha! I've got a app for that! 

By inputing your location, or even better, _any location_ -  you can easily see what will be the level of magnetic activity in hour from now - enough to prepare those extra warm socks and underwear and charge your camera batteries! 
For those who are trembling inside, when they see the temperature dropping below zero (yes, that's me) - we have an Instagram-alike part of the app too! See wonderful pictures of auroras made by users who were lucky enough to see it and come back alive from those unfriendly, cold lands.

This RESTful piece of magic runs thanks to Node.js (Express) in the back end. Front End is based on EJS, Bootstrap, SCSS and JS/jQuery. I have combined Google Maps API and Aurora details (bunch of super useful data, including the ACE Spacecraft details taken, from [here](https://auroras.live/#/)), so based on the location typed into Autocomplete input, returned is not only the main KP value (core for forecasting auroras), but also basic weather details (temperature, clouds, etc.). 

Photo part of the app is also utilizing AWS for the image upload. 


* Super awesome welcome screen with video background
![Welcome screen](https://s3-eu-west-1.amazonaws.com/wdi27/Screen+Shot+2017-06-15+at+21.00.30.png)

* Options that you see once logged in
![Dashboard](https://s3-eu-west-1.amazonaws.com/wdi27/Screen+Shot+2017-06-15+at+21.00.57.png)

* Image page
![Image page](https://s3-eu-west-1.amazonaws.com/wdi27/Screen+Shot+2017-06-15+at+21.01.16.png)

* User's page with chosen locations saved (because why not traciking couple of places?)
![User page](https://s3-eu-west-1.amazonaws.com/wdi27/Screen+Shot+2017-06-15+at+21.01.55.png)



## Technologies used:

* HTML 5
* CSS animations
* SCSS
* jQuery 3.10
* Gulp
* Yarn
* Git & github
* JSON
* AJAX
* nodeJS
* GoogleMaps API
* Facebook oAuth
* MongoDB
* Express.js
* first time I've used Balsamiq ([my super sweet wireframe](https://s3-eu-west-1.amazonaws.com/wdi27/Alex+makes+an+app.png))

## Challenges faced:

* First time I have used GoogleMaps API. There were loads of smaller bits and pieces that made the whole proccess relatively difficult (_but hey... it works now, right? :)_ ). First - looks like getting the country code is _really_ tough. It is placed in different objects in the response, there is no logic behind that... Had to request this from another API in the end (GeoNames)!

```
$.ajax({

//getting the country code based on the lat and lng pulled from Google Maps

        url: `/country?lat=${lat}&lng=${lng}`
      })
      .done((response) => {
      
//and all that effort for only 2, quite useful letters
      
        const placeName = (`${places[0].name}, ${response.countryCode}`);
        $('h3.place-name').html(placeName);
     });
```

I also have used Autocomplete and standard Google Map - at that time this was a bit of an issue, how NOT to repeat my initMap function, but...

```
function initMap() {
//code for initMap 
//more code
//...and if this is for Autocomplete - just run another function! Sweet and DRY!
  if($(mapDiv).hasClass('autocomplete')) initAutocomplete(map);
    });
  }
```

* Had to actually learn how auroras occur. I know, it's embarrasing to admit that, but transparency and so on... Physics is not my strongest side... I am super happy that I challenged myself though! After cracking the whole API and Google Maps side, had to take the breakdowns for KP and this resulted in the below:

```
//taking all the API data that we need
      const kp = forecast.ace.kp1hour;
      const time = forecast.ace.date;
      const sunrise = forecast.weather.sunrise;
      const sunset = forecast.weather.sunset;
      let probability;
//scale for KP breakdowns. Long story short - the higher up north you are, the less KP you need to see it.
      if(lat >= 60 && kp >= 5 ||
         lat >= 62 && kp >= 4 ||
         lat >= 65 && kp >= 3 ||
         lat >= 68 && kp >= 2 ||
         lat >= 70 && kp >= 1){
//time issue. Took me a while to realise that things are working differently up there. There might be high KP, but during the polar day - no auroras for you then!
        if((time > sunrise && time < sunset) || (sunrise === 'n\/a')|| (sunset === 'n\/a')){
          probability = 'High geomagnetic activity, but too light outside to see it';
        } else{
          probability = 'High chances you\'ll see the mighty aurora!';
        }
      } else {
        probability = 'KP too weak for this location';
      }
```

## Improvements:

* Aurora Australis works on the same basis - I think it's worth including it too. All I need to get is the breakdown points of lat for the Southern Hemisphere.



