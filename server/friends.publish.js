'use strict';

Meteor.publish('friends', function (options, searchString) {
    searchString = searchString || '';

    Counts.publish(this, 'matchingFriends', Friends.find({
        'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
        $and: [
            {createdby: this.userId},
            {createdby: {$exists: true}}
        ]
    }), {noReady: true});

    Counts.publish(this, 'totalFriends', Friends.find({
        $and: [
            {createdby: this.userId},
            {createdby: {$exists: true}}
        ]
    }), {noReady: true});

    return Friends.find({
        'name': {'$regex': '.*' + searchString || '' + '.*', '$options': 'i'},
        $and: [
            {createdby: this.userId},
            {createdby: {$exists: true}}
        ]
    }, options);
});

Meteor.methods({
    linkMatchingFriendsToGoogle: function (email, googleAvatarURL) {
        Friends.update(
            {'email': email},
            {$set: {'userId': Meteor.userId(), 'gavatar': googleAvatarURL}},
            {multi: true}
        );
    },
    linkFriendToGoogle: function (friendId, userId, googleAvatarURL) {
        Friends.update(
            {'_id': friendId },
            {$set: {'userId': userId, 'gavatar': googleAvatarURL}}
        );
    }
});
