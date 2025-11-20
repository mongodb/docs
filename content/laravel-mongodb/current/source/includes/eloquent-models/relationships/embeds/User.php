<?php

declare(strict_types=1);

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\EmbedsMany;

class User extends Model
{
    protected $with = ['addresses'];

    public function addresses()
    {
        return $this->embedsMany(Address::class);
    }
}
