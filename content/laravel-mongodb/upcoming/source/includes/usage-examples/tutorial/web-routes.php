use App\Http\Controllers\TaskController;

// Other route definitions...

Route::resource('tasks', TaskController::class)->middleware('auth');