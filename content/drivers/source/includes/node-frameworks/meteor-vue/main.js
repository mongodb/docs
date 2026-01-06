import { Meteor } from 'meteor/meteor';
import { RestaurantsCollection } from '../imports/api/restaurantsCollection';
import '../imports/api/restaurantsPublications';

Meteor.startup(async () => {
  // Check connection to restaurants collection
  try {
    const restaurantCount = await RestaurantsCollection.find().countAsync();
    console.log(`Connected to MongoDB Atlas. Found ${restaurantCount} restaurants in the collection`);
  } catch (error) {
    console.error('Error connecting to restaurants collection:', error);
  }
});
