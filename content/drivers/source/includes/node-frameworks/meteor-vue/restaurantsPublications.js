import { Meteor } from 'meteor/meteor';
import { RestaurantsCollection } from './restaurantsCollection';

// Publishes all restaurants
Meteor.publish('restaurants', function publishRestaurants() {
    console.log('Publishing all restaurants...');
    const cursor = RestaurantsCollection.find({}, { limit: 200 }); // Limit for performance
    console.log('Publication cursor created for all restaurants');
    return cursor;
});

// Publishes restaurants that match the "borough" and "name" filters
Meteor.publish('restaurants.filtered', function publishFilteredRestaurants() {
    console.log('Publishing filtered restaurants...');
    const query = {
        borough: 'Queens',
        name: { $regex: 'Moon', $options: 'i' }
    };
    const cursor = RestaurantsCollection.find(query);
    console.log('Publication cursor created for filtered restaurants');
    return cursor;
});