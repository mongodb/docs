<?php

namespace Bson;

// start-user-class
class User implements MongoDB\BSON\Persistable
{
    public function __construct(
        private string $username,
        private Role $role,
        private MongoDB\BSON\ObjectId $_id = new MongoDB\BSON\ObjectId(),
    ) {
    }

    public function bsonSerialize(): array
    {
        return [
            '_id' => $this->_id,
            'username' => $this->username,
            'role' => $this->role,
        ];
    }

    public function bsonUnserialize(array $data): void
    {
        $this->_id = $data['_id'];
        $this->username = $data['username'];
        $this->role = Role::from($data['role']);
    }
}
// end-user-class
