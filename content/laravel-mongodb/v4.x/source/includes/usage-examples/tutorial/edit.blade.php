<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Edit Task') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @foreach($tasks as $task)
                        <form action="{{ route('tasks.update', $task->id) }}" method="POST">
                            @csrf
                            @method('PUT')
                            
                            <div class="mb-4">
                                <label for="title" class="block text-gray-700">Title:</label>
                                <input type="text" 
                                       name="title" 
                                       id="title" 
                                       required 
                                       class="border border-gray-300 p-2 w-full" 
                                       value="{{ old('title', $task->title) }}">
                                @error('title')
                                    <p class="text-red-500">{{ $message }}</p>
                                @enderror
                            </div>
                            
                            <div class="mb-4">
                                <label for="description" class="block text-gray-700">Description:</label>
                                <textarea name="description" 
                                          id="description" 
                                          class="border border-gray-300 p-2 w-full">{{ old('description', $task->description) }}</textarea>
                            </div>
                            
                            <div class="mb-4">
                                <label for="due_date" class="block text-gray-700">Due Date:</label>
                                <input type="date" 
                                       name="due_date" 
                                       id="due_date" 
                                       required 
                                       class="border border-gray-300 p-2 w-full" 
                                       value="{{ old('due_date', $task->due_date) }}">
                                @error('due_date')
                                    <p class="text-red-500">{{ $message }}</p>
                                @enderror
                            </div>
                            
                            <div class="mb-4">
                                <label for="reminder_time" class="block text-gray-700">Reminder Time:</label>
                                <input type="datetime-local" 
                                       name="reminder_time" 
                                       id="reminder_time" 
                                       class="border border-gray-300 p-2 w-full" 
                                       value="{{ old('reminder_time', $task->reminder_time) }}">
                            </div>
                            
                            <button type="submit" 
                                    class="bg-blue-500 text-white p-2 rounded">
                                Update Task
                            </button>
                        </form>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</x-app-layout>