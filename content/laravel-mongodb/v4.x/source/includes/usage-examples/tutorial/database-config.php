return [

    'connections' => [

      'mongodb' => [
         'driver' => 'mongodb',
         'dsn' => env('MONGODB_URI'),
         'database' => 'task_reminder',
      ],

      // Other connections here
    ],

];