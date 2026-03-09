<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Tasks') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="container mx-auto p-4">
                    <h2 class="text-2xl font-bold mb-4">Create New Task</h2>
                    
                    <form action="{{ route('tasks.store') }}" method="POST">
                        @csrf
                        
                        <div class="mb-4">
                            <label for="title" class="block text-gray-700">Title:</label>
                            <input type="text" 
                                   name="title" 
                                   id="title" 
                                   required 
                                   class="border border-gray-300 p-2 w-full" 
                                   value="{{ old('title') }}">
                            @error('title')
                                <p class="text-red-500">{{ $message }}</p>
                            @enderror
                        </div>
                        
                        <div class="mb-4">
                            <label for="description" class="block text-gray-700">Description:</label>
                            <textarea name="description" 
                                      id="description" 
                                      class="border border-gray-300 p-2 w-full">{{ old('description') }}</textarea>
                        </div>
                        
                        <div class="mb-4">
                            <label for="due_date" class="block text-gray-700">Due Date:</label>
                            <input type="date" 
                                   name="due_date" 
                                   id="due_date" 
                                   required 
                                   class="border border-gray-300 p-2 w-full" 
                                   value="{{ old('due_date') }}">
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
                                   value="{{ old('reminder_time') }}">
                        </div>
                        
                        <button type="submit" 
                                class="bg-green-600 text-white p-2 border rounded">
                            Create Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>