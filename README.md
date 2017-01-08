# Flickr Browser

## Overview
Browse publicly accessbile photos. Optionally filter by tag or text search.
Popular photos display their view count as a badge in the top right corner.

## How do I use this tool?
You must have `yarn` or `docker-compose` installed.

Copy `.env.example` to `.env` and replace the Flickr API credentials with your own.

To run the app in development mode, run `yarn start`.

To run the app in production mode, run `yarn build ; docker-compose up -d`, by default `http://localhost:1337` will render the site. If you would like to change the port, you can do so in `docker-compose.yml`.

If I was to run this in a production environment, I would make use of [nginx-proxy](https://github.com/jwilder/nginx-proxy) and set a `VIRTUAL_HOST` environment on the container to whatever domain I would like to use.

## Why has this tool been developed?
To showcase how I would approach building a SPA. The app makes use of the following technology:

* React
* React Router
* Redux
* Axios
* Docker
* LibSass
* Gulp

I have considered the following ideas in the design:

* Responsive Layout
* Lazy loading images

Future considerations could include:

* Infinite scrolling, or possibly using a queuing system (such as RabbitMQ) to retrieve updates to the feed
* Caching results returned from the API
* Introducing react-router-redux to manage route state persistance

## Demo

![Preview](https://github.com/flyingbuddha/flickr-browser/blob/master/ui.gif)
