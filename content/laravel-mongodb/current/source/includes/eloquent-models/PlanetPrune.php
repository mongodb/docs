<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;

class Planet extends Model
{
    use Prunable;

    public function prunable()
    {
        // matches models in which the solar_system field contains a null value
        return static::whereNull('solar_system');
    }

    protected function pruning()
    {
        // Add cleanup actions, such as logging the Planet 'name' attribute
    }
}
