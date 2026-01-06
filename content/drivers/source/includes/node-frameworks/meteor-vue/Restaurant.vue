<script setup>
defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <tr class="border-b transition-colors hover:bg-gray-50">
    <td class="p-4 align-middle">{{ restaurant.name }}</td>
    <td class="p-4 align-middle">{{ restaurant.borough }}</td>
    <td class="p-4 align-middle">{{ restaurant.cuisine }}</td>
  </tr>
</template>