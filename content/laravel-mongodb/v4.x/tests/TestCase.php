<?php

declare(strict_types=1);

namespace MongoDB\Laravel\Tests;

use MongoDB\Laravel\MongoDBServiceProvider;
use Orchestra\Testbench\TestCase as OrchestraTestCase;

/**
 * Base test case for the Laravel MongoDB documentation examples.
 *
 * The mongodb/laravel-mongodb package marks its tests directory as
 * export-ignore, so its own MongoDB\Laravel\Tests\TestCase is not available
 * when the package is installed as a dependency. This local copy provides the
 * class for the documentation examples.
 */
abstract class TestCase extends OrchestraTestCase
{
    protected function getPackageProviders($app): array
    {
        return [
            MongoDBServiceProvider::class,
        ];
    }

    protected function getEnvironmentSetUp($app): void
    {
        $app['config']->set('app.key', 'ZsZewWyUJ5FsKp9lMwv4tYbNlegQilM7');

        $app['config']->set('database.default', 'mongodb');
        $app['config']->set('database.connections.mongodb', [
            'driver' => 'mongodb',
            'dsn' => env('MONGODB_URI', 'mongodb://127.0.0.1:27017/?directConnection=true'),
            'database' => env('MONGODB_DATABASE', 'unittest'),
        ]);
        $app['config']->set('database.connections.sqlite', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);

        $app['config']->set('cache.driver', 'array');
    }
}
