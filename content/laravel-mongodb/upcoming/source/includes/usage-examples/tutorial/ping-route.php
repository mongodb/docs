Route::get('/ping', function (Request $request) {
    $connection = DB::connection('mongodb');
    try {
        $connection->command(['ping' => 1]);
        $msg = 'MongoDB is accessible!';
    } catch (\MongoDB\Driver\Exception\ConnectionException $e) {
        $msg = 'You are not connected to MongoDB. Error: ' . $e->getMessage();
    }
    return ['msg' => $msg];
});