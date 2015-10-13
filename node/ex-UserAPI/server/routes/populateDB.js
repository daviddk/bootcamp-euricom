//check if you have one user if not, run populate

var collection = function() {
    userCollection = [];

    for(let i = 0; i < 10; i++) {
        var user = new Users({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.random.number(),
            email: faker.internet.email(),
            homeAddress: {
                addressLine: faker.address.streetName(),
                city: faker.address.city(),
                zip: faker.address.zipCode()
            }
        });
        userCollection.push(user);
    }

    console.log(userCollection);
    return userCollection;
}

Users.collection.insert(collection, onInsert);

function onInsert(err, docs) {
   if (err) {
       console.log(err);
   } else {
       console.info('%d users were successfully stored.', docs.length);
   }
}
