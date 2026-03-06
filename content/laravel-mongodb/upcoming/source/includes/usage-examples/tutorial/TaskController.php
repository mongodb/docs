<?php 

namespace App\Http\Controllers; 

use App\Models\Task; 
use Carbon\Carbon; 
use Illuminate\Http\Request; 

class TaskController extends Controller {
    /**
     * Displays a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::where('email', auth()->user()->email)->get();
        return view('tasks.index', compact('tasks'));
    }

    /**
     * Shows the form for creating a new resource.
     */
    public function create()
    {
        return view('tasks.create');
    }

    /**
     * Stores a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'reminder_time' => 'required|date',
        ]);

        $data['due_date'] = Carbon::parse($request->due_date);
        $data['reminder_time'] = Carbon::parse($request->reminder_time);
        $data['email'] = auth()->user()->email;
        $data['last_notification_date'] = null;

        Task::create($data);

        return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
    }

    /**
     * Displays the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Shows the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $tasks = Task::where('id', $id)->get();
        return view('tasks.edit', ['tasks' => $tasks]);
    }

    /**
     * Updates the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'reminder_time' => 'required|date',
        ]);

        $task = Task::findOrFail($id);

        $data['due_date'] = Carbon::parse($request->due_date)->format('Y-m-d H:i:s');
        $data['reminder_time'] = Carbon::parse($request->reminder_time)->format('Y-m-d H:i:s');
        $task->update($data);

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Removes the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }
}