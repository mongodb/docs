<script setup lang="ts">
import { computed } from 'vue'
import { MapPin, Utensils, ChevronRight } from 'lucide-vue-next'

// Type definitions
interface Grade {
  grade?: string
  score?: number
}

interface Restaurant {
  _id: string
  name: string
  borough?: string
  cuisine?: string
  grades?: Grade[]
}

// Determine endpoint based on current route
const route = useRoute()
const isBrowse = computed(() => route.path === '/browse')
const endpoint = computed(() => 
  isBrowse.value ? '/api/restaurants/browse' : '/api/restaurants'
)

// Fetch data using Nuxt's useFetch composable
// Automatically refetches when endpoint changes
const { data: restaurants } = await useFetch<Restaurant[]>(endpoint, {
  watch: [endpoint],
  default: () => [],
})

// Dynamic page content
const pageTitle = computed(() =>
  isBrowse.value ? 'Hidden Gems in Queens' : 'All Restaurants'
)

const pageSubtitle = computed(() =>
  isBrowse.value
    ? "Filtered by: Borough 'Queens' & Name contains 'Moon'"
    : 'Explore our complete directory of local favorites'
)

// Deterministic gradient based on name length
const getGradient = (name: string) => {
  const gradients = [
    'from-orange-400 to-pink-500',
    'from-blue-400 to-indigo-500',
    'from-green-400 to-emerald-500',
    'from-purple-400 to-fuchsia-500',
  ]
  return gradients[name.length % gradients.length]
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h3 class="text-3xl font-bold text-gray-800">
        {{ pageTitle }}
      </h3>
      <p class="text-gray-500 mt-2">
        {{ pageSubtitle }}
      </p>
    </div>

    <!-- Restaurant Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant._id"
        class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
      >
        <!-- Gradient Header -->
        <div
          :class="[
            'h-32 bg-gradient-to-br p-6 flex items-end relative',
            getGradient(restaurant.name)
          ]"
        >
          <span class="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full border border-white/30">
            Grade {{ restaurant.grades?.[0]?.grade ?? 'N/A' }}
          </span>
          <h3 class="text-white text-xl font-bold drop-shadow-md line-clamp-2">
            {{ restaurant.name }}
          </h3>
        </div>

        <!-- Card Body -->
        <div class="p-5 flex-1 flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100">
              <Utensils class="w-3 h-3" />
              {{ restaurant.cuisine ?? 'Unknown' }}
            </span>
            <div class="flex items-center text-gray-400 text-xs font-medium">
              <MapPin class="w-3 h-3 mr-1" />
              {{ restaurant.borough ?? 'Unknown' }}
            </div>
          </div>

          <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
            <span class="text-gray-400">
              Score: {{ restaurant.grades?.[0]?.score ?? 0 }}
            </span>
            <button class="text-indigo-600 font-semibold group-hover:underline flex items-center gap-1">
              View Menu <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="restaurants?.length === 0" class="text-center py-12 text-gray-500">
      <p>No restaurants found.</p>
      <p class="text-sm mt-2">Check your MongoDB connection and ensure the sample_restaurants database is loaded.</p>
    </div>
  </div>
</template>