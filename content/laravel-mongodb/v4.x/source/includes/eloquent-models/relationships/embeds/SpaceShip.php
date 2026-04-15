<?php

declare(strict_types=1);

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\EmbedsMany;

class SpaceShip extends Model
{
    protected $connection = 'mongodb';
    protected $with = ['cargo'];

    public function cargo(): EmbedsMany
    {
        return $this->embedsMany(Cargo::class);
    }
}
