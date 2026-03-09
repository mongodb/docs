<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Tasks') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <div class="mb-2">
                        <a href="{{ route('tasks.create') }}" 
                           class="p-2 border mb-4">
                            Create New Task
                        </a>
                    </div>
                    
                    <ul class="mt-4">
                        @foreach ($tasks as $task)
                            <div class="mt-2">
                                <hr>
                            </div>
                            
                            <li>
                                <h1 class="text-2xl">
                                    <strong>{{ $task->title }}</strong>
                                    - Due: {{ $task->due_date }}
                                </h1>
                                
                                <p class="text-gray-600">
                                    {{ $task->description }}
                                </p>
                                
                                <div class="flex gap-2 mt-4">
                                    <div class="p-2 text-white bg-gray-700">
                                        <a href="{{ route('tasks.edit', $task->id) }}">
                                            Edit
                                        </a>
                                    </div>
                                    
                                    <div class="p-2 text-white bg-red-700 rounded">
                                        <form action="{{ route('tasks.destroy', $task->id) }}" 
                                              method="POST" 
                                              style="display:inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit">Delete</button>
                                        </form>
                                    </div>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>