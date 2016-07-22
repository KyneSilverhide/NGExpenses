Friends = new Mongo.Collection('friends');

Friends.allow({
    insert: function (userId) {
        return userId != null;
    },
    update: function (userId, friend) {
        return userId != null && friend.createdby === userId;
    },
    remove: function (userId, friend) {
        return userId != null && friend.createdby === userId;
    }
});