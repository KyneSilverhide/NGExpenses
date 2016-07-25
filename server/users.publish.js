Meteor.publish("userData", function () {
    return Meteor.users.find(
        {}, {
            fields: {
                'services.google.picture': 1,
                'services.google.email': 1,
                'profile': 1
            }
        });
});