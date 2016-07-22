'use strict';

Meteor.publish('events', function (options, searchString) {
    searchString = searchString || '';

    Counts.publish(this, 'matchingEvents', Events.find({
        'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
        $and: [
            {createdby: this.userId},
            {createdby: {$exists: true}}
        ]
    }), {noReady: true});

    Counts.publish(this, 'totalEvents', Events.find({
        $and: [
            {createdby: this.userId},
            {createdby: {$exists: true}}
        ]
    }), {noReady: true});

    return Events.find({
        'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
        $and: [
            {createdby: this.userId},
            {createdby: {$exists: true}}
        ]
    }, options);
});