module.exports = {
    map: function map(user) {
        return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            age: user.age,
            email: user.email,
            address: user.homeAddress.addressLine,
            city: user.homeAddress.city,
            zip: user.homeAddress.zip
        }
    },

    // split: function split(user, resource) {
    //     var name = resource.name.split();
    //     user.firstName = name[0];
    //     ...
    //     return {
    //         firstName: name[0],
    //         lastName: name[1] + name[2],
    //         age: user.age,
    //         email: user.email,
    //         homeAddress: {
    //             addressLine: user.address,
    //             city: user.city,
    //             zip: user.zip
    //         }
    //     }
    // }
};
