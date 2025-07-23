<?php

declare(strict_types=1);

namespace App\Tests;

use App\Models\Planet;
use MongoDB\Laravel\Tests\TestCase;

class SchemaVersionTest extends TestCase
{
    /**
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testSchemaVersion(): void
    {
        require_once __DIR__ . '/PlanetSchemaVersion2.php';

        Planet::truncate();

        // begin-schema-version
        // Simulates a document in the collection with schema version 1
        Planet::insert([
            [
                'name' => 'WASP-39 b',
                'type' => 'gas',
                'schema_version' => 1,
            ],
        ]);

        // Saves a document with no specified schema version
        $saturn = Planet::create([
            'name' => 'Saturn',
            'type' => 'gas',
        ]);

        // Retrieves both models from the collection
        $planets = Planet::where('type', 'gas')
            ->get();
        // end-schema-version

        $this->assertCount(2, $planets);

        $p1 = Planet::where('name', 'Saturn')->first();

        $this->assertEquals(2, $p1->schema_version);

        $p2 = Planet::where('name', 'WASP-39 b')->first();

        $this->assertEquals(2, $p2->schema_version);
        $this->assertEquals('Milky Way', $p2->galaxy);
    }
}
