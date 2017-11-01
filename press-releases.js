var fetch = require("node-fetch");
var {
  curry,
  compose,
  partial,
  partialRight,
  pipe,
  take,
  map,
  getProp,
  setProp,
  filter
} = require("./toolset");

const API_ENDPOINT =
  "https://www.stellarbiotechnologies.com/media/press-releases/json?limit=10&offset=0";

var getTitle = partial(getProp, "title");
var getNews = partial(getProp, "news");
var publishedLastYear = partial(only, new RegExp(/^2017/), "published");

var processList = compose(
  showResults,
  partialRight(map, getTitle),
  curry(take)(2),
  partialRight(filter, publishedLastYear)
);

var composed = compose( output, processList, getNews );

fetch(API_ENDPOINT)
  .then(toJSON)
  .then(composed)
  .catch(handleError);


// ***************************

function output(stuff) {
  console.log(stuff);
}

function toJSON(response) {
  return Promise.resolve(response.json());
}

function handleError(reason) {
  console.error(reason);
}

function only(regex, property, item) {
  return regex.test(item[property]);
}

function showResults(data) {
  return {
    results: data
  };
}

