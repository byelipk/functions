// CHALLENGE
//
//
// Massage the data into an array of objects that looks like this:
//
// {
//   "countries": [
//     {
//       "count": 1,
//       "people": ["attendee@acme.com"],
//       "name": "Wales",
//       "start": "2017-04-29"
//     },
//     ...
//   ]
// }

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
      "email": "robbydee@acme.com",
      "country": "United States",
      "dates": ["2017-05-03", "2017-05-06"]
    },
    {
      "first": "Bee",
      "last": "Queen",
      "email": "beequeen@acme.com",
      "country": "Ireland",
      "dates": ["2017-04-27", "2017-04-29", "2017-04-30"]
    },
    {
      "first": "Jane",
      "last": "Google",
      "email": "janegoogle@acme.com",
      "country": "Spain",
      "dates": ["2017-04-29", "2017-04-30", "2017-05-01"]
    },
    {
      "first": "Tiff",
      "last": "Lukas",
      "email": "tifflukas@acme.com",
      "country": "Spain",
      "dates": ["2017-04-28", "2017-04-29", "2017-05-01", "2017-05-04"]
    },
    {
      "first": "Sherlock",
      "last": "Temple",
      "email": "sherlocktemple@acme.com",
      "country": "Spain",
      "dates": ["2017-04-28", "2017-04-29", "2017-05-02", "2017-05-04"]
    },
    {
      "first": "Robin",
      "last": "Yearwood",
      "email": "robinyearwood@acme.com",
      "country": "Spain",
      "dates": ["2017-04-29", "2017-04-30", "2017-05-02", "2017-05-03"]
    },
    {
      "first": "Shirly",
      "last": "Temple",
      "email": "stemple@acme.com",
      "country": "Spain",
      "dates": ["2017-04-30", "2017-05-01"]
    },
    {
      "first": "Lovejoy",
      "last": "Magic",
      "email": "lmagic@acme.com",
      "country": "Spain",
      "dates": ["2017-04-28", "2017-04-29", "2017-05-01", "2017-05-03"]
    },
    {
      "first": "Mister",
      "last": "Wilbur",
      "email": "mwilbur@acme.com",
      "country": "Spain",
      "dates": ["2017-04-29", "2017-04-30", "2017-05-02", "2017-05-03"]
    },
    {
      "first": "Sir",
      "last": "Newton",
      "email": "snewton@acme.com",
      "country": "United States",
      "dates": ["2017-05-04", "2017-05-09"]
    }
  ]
});

// ***************************

console.log(DATA)