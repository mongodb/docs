<?php

namespace Bson;

// start-person-class
class Person implements MongoDB\BSON\Persistable
{
    private \MongoDB\BSON\ObjectId $id;
    private \MongoDB\BSON\UTCDateTime $createdAt;

    public function __construct(private string $name)
    {
        $this->id = new \MongoDB\BSON\ObjectId();
        $this->createdAt = new \MongoDB\BSON\UTCDateTime();
    }

    public function bsonSerialize(): array
    {
        return [
            '_id' => $this->id,
            'name' => $this->name,
            'createdAt' => $this->createdAt,
        ];
    }

    public function bsonUnserialize(array $data): void
    {
        $this->id = $data['_id'];
        $this->name = $data['name'];
        $this->createdAt = $data['createdAt'];
    }
}
// end-person-class
