Events = new Mongo.Collection('events');

Events.allow({
    insert: function (userId) {
        return userId != null;
    },
    update: function (userId, event) {
        return userId != null && event.createdby === userId;
    },
    remove: function (userId, event) {
        return userId != null && event.createdby === userId;
    }
});