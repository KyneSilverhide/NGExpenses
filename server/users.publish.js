Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {
                fields: {
                    'services.google.picture': 1,
                    'services.google.email': 1,
                    'profile': 1
                }
            });
    } else {
        this.ready();
    }
});