'use strict';

Meteor.publish('events', function (options, searchString, ignoreCompleted) {
    searchString = searchString || '';

    var andConditions = [
        {'createdby': this.userId}
    ];
    if(!ignoreCompleted) {
        andConditions.push({'completed': false});
    }

    Counts.publish(this, 'matchingEvents', Events.find({
        'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
        $and: andConditions
    }), {noReady: true});

    Counts.publish(this, 'totalEvents', Events.find({
        $and: andConditions
    }), {noReady: true});

    return Events.find({
        'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
        $and: andConditions
    }, options);
});

Meteor.methods({
    markCompleted: function (eventId) {
        Events.update(eventId, {$set: {'completed': true}});
    }
});
