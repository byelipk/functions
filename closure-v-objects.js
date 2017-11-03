// Here's an object

var obj = {
  name: "Oats",
  address: {
    street: "the street",
    phone: "the phone",
    country: "the country"
  }
};

// How can we represent this object using closure?

function theObject() {
  var name = "Oats";
  return theAddress();

  // *****************

  function theAddress() {
    var street = "the street";
    var phone = "the phone";
    var country = "the country";

    return function theResult(comments) {
      return [name, street, phone, country, comments];
    }
  }
}

var nice = theObject()

console.log(nice("works"))

// What about going the othe way?

function person(name,age) {
  return function happyBirthday() {
      age++;
      console.log(
          `Happy ${age}th Birthday, ${name}!`
      );
  }
}

var birthdayBoy = person( "Kyle", 36 );

birthdayBoy(); 

// What we did with closure we can do with objects.

var birthdayBoy = {
  name: "Kyle",
  age: 23,
  happyBirthday: function hbd() {
    this.age += 1;
    console.log(`Happy ${this.age}th Birthday, ${this.name}!`)
  }
}

birthdayBoy.happyBirthday()