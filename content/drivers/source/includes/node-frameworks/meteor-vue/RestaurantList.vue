<script setup>
import Restaurant from '../components/Restaurant.vue';
import { subscribe, autorun } from 'vue-meteor-tracker';
import { RestaurantsCollection } from '../../api/restaurantsCollection';
import { useRoute, RouterLink } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

// Determines whether to show filtered results
const isFiltered = computed(() => route.path === '/browse');

// Subscribes to both publications to avoid switching issues
subscribe('restaurants');
subscribe('restaurants.filtered');

// Retrieves restaurants based on current route with client-side filtering as backup
const restaurants = autorun(() => {
  let docs;
  
  if (isFiltered.value) {
    docs = RestaurantsCollection.find({
      borough: 'Queens',
      name: { $regex: 'Moon', $options: 'i' }
    }).fetch();
    console.log('Filtered restaurants found:', docs.length);
  } else {
    docs = RestaurantsCollection.find({}, { limit: 200 }).fetch();
    console.log('All restaurants found:', docs.length);
  }
  
  return docs;
}).result;

// Determines the title based on the route
const getTitle = computed(() => {
  return isFiltered.value 
    ? 'Filtered Restaurants (Queens, containing "Moon")' 
    : 'All Restaurants';
});
</script>

<template>
  <div class="container mx-auto px-4">
    <!-- Navigation -->
    <nav class="flex justify-between items-center mb-6 p-4 bg-white shadow rounded">
      <div class="flex space-x-4">
        <RouterLink 
          to="/" 
          class="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
          :class="{ 'bg-blue-100 font-semibold': !isFiltered }"
        >
          All Restaurants
        </RouterLink>
        <RouterLink 
          to="/browse" 
          class="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
          :class="{ 'bg-blue-100 font-semibold': isFiltered }"
        >
          Browse Filtered
        </RouterLink>
      </div>
    </nav>

    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-4xl font-bold text-gray-800 my-4">Restaurant Directory</h1>
      <h3 class="text-lg font-semibold text-gray-600">{{ getTitle }}</h3>
    </header>

    <!-- Restaurant Table -->
    <div class="border rounded-lg overflow-hidden shadow">
      <div class="relative w-full overflow-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-100 border-b-2 border-gray-300">
            <tr class="border-b-2 border-gray-400">
              <th class="h-14 px-4 text-left align-middle font-bold text-gray-900 text-base tracking-wide">
                Name
              </th>
              <th class="h-14 px-4 text-left align-middle font-bold text-gray-900 text-base tracking-wide">
                Borough
              </th>
              <th class="h-14 px-4 text-left align-middle font-bold text-gray-900 text-base tracking-wide">
                Cuisine
              </th>
            </tr>
          </thead>
          <tbody>
            <Restaurant 
              v-for="restaurant in restaurants" 
              :key="restaurant._id" 
              :restaurant="restaurant" 
            />
          </tbody>
        </table>
        
        <!-- Empty state -->
        <div v-if="restaurants.length === 0" class="p-8 text-center text-gray-500">
          <p>No restaurants found. Ensure that your connection URI is correct and includes the sample_restaurants database name.</p>
          <p v-if="isFiltered" class="text-sm mt-2">
            Try the "All Restaurants" tab to see all available restaurants.
          </p>
        </div>
      </div>
    </div>

    <!-- Restaurant count -->
    <div class="mt-4 text-sm text-gray-600">
      Showing {{ restaurants.length }} restaurant{{ restaurants.length !== 1 ? 's' : '' }}
    </div>
  </div>
</template>