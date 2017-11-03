// CHALLENGE
//
//
// Massage the data into an array of objects that looks like this:
//
// {
//   "countries": [
//     {
//       "count": 1,
//       "people": ["attendee@acmepartners.com"],
//       "name": "Wales",
//       "start": "2017-04-29"
//     },
//     ...
//   ]
// }
//
// Here's the algorithm for the start date for each country:
//
//  1. Select the two-day period where the most people can attend for 
//     both days in a row.
//  2. If there are multiple dates, choose the earlier date.
//  3. If there are no two-day periods, start date should be set to null.

var { 
  compose, 
  pipe, 
  curry, 
  partial, 
  partialRight 
} = require('./toolset');


// The Data
// ***************************

const DATA = Object.freeze({
  "people": [
    {
      "first": "Robby",
      "last": "Dee",
      "email": "robbydee@acmepartners.com",
      "country": "United States",
      "dates": ["2017-05-03", "2017-05-06"]
    },
    {
      "first": "Bee",
      "last": "Queen",
      "email": "beequeen@acmepartners.com",
      "country": "Ireland",
      "dates": ["2017-04-27", "2017-04-29", "2017-04-30"]
    },
    {
      "first": "Jane",
      "last": "Google",
      "email": "janegoogle@acmepartners.com",
      "country": "Spain",
      "dates": ["2017-04-29", "2017-04-30", "2017-05-01"]
    },
    {
      "first": "Tiff",
      "last": "Lukas",
      "email": "tifflukas@acmepartners.com",
      "country": "Spain",
      "dates": ["2017-04-28", "2017-04-29", "2017-05-01", "2017-05-04"]
    },
    {
      "first": "Sherlock",
      "last": "Temple",
      "email": "sherlocktemple@acmepartners.com",
      "country": "Spain",
      "dates": ["2017-04-28", "2017-04-29", "2017-05-02", "2017-05-04"]
    },
    {
      "first": "Robin",
      "last": "Yearwood",
      "email": "robinyearwood@acmepartners.com",
      "country": "Spain",
      "dates": ["2017-04-29", "2017-04-30", "2017-05-02", "2017-05-03"]
    },
    {
      "first": "Shirly",
      "last": "Temple",
      "email": "stemple@acmepartners.com",
      "country": "Spain",
      "dates": ["2017-04-30", "2017-05-01"]
    },
    {
      "first": "Lovejoy",
      "last": "Magic",
      "email": "lmagic@acmepartners.com",
      "country": "Spain",
      "dates": ["2017-04-28", "2017-04-29", "2017-05-01", "2017-05-03"]
    },
    {
      "first": "Mister",
      "last": "Wilbur",
      "email": "mwilbur@acmepartners.com",
      "country": "Spain",
      "dates": ["2017-04-29", "2017-04-30", "2017-05-02", "2017-05-03"]
    },
    {
      "first": "Sir",
      "last": "Newton",
      "email": "snewton@acmepartners.com",
      "country": "United States",
      "dates": ["2017-05-04", "2017-05-09"]
    }
  ]
});

// ***************************

console.log(DATA)