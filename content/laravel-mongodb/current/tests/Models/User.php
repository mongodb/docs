<?php

declare(strict_types=1);

namespace MongoDB\Laravel\Tests\Models;

use MongoDB\Laravel\Eloquent\Model;

/**
 * Minimal user model used by the aggregation examples.
 *
 * The mongodb/laravel-mongodb package marks its tests directory as
 * export-ignore, so its own MongoDB\Laravel\Tests\Models\User is not available
 * when the package is installed as a dependency. This local copy provides the
 * model for the documentation examples.
 */
class User extends Model
{
    protected $connection = 'mongodb';
    protected $table = 'users';
    protected static $unguarded = true;
}
