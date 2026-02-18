<template>
  <nav class="flex justify-between items-center mb-6 bg-white shadow-md px-6 py-4 rounded-lg">
    <NuxtLink to="/">
      <img
        alt="MongoDB logo"
        class="h-10"
        src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
      />
    </NuxtLink>
    
    <div class="flex gap-4">
      <NuxtLink 
        to="/" 
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="$route.path === '/' 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-100'"
      >
        All Restaurants
      </NuxtLink>
      <NuxtLink 
        to="/browse" 
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="$route.path === '/browse' 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-100'"
      >
        Browse Filtered
      </NuxtLink>
    </div>
  </nav>
</template>