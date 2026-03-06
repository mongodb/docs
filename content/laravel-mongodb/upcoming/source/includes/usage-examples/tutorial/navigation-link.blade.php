// ...existing code ... 
<div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
    <x-nav-link :href="route('tasks.index')" :active="request()->routeIs('tasks.index')">
        {{ __('Tasks') }}
    </x-nav-link>
</div>