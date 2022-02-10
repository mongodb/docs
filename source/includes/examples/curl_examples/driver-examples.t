#  Copyright 2017 - present MongoDB, Inc.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

# MongoDB documentation examples in Perl.

# NOTE: Developers: Do not change these examples without approval of the
# MongoDB documentation team as they are extracted to populate examples
# on the MongoDB docs website.
#
# Examples use `$db->coll("inventory")` to parallel the shell examples, which
# use `db.inventory`.  Testing commands use a `$coll` variable for more
# idiomatic brevity.

use v5.10;
use strict;
use warnings;
use Test::More 0.96;

use MongoDB;
use Tie::IxHash;
use boolean;
use BSON::Types 'bson_time';

use lib "t/lib";
use MongoDBTest qw/
    build_client
    get_test_db
    server_version
    skip_unless_mongod
    skip_unless_sessions
/;

skip_unless_mongod();

my $conn           = build_client();
my $db             = get_test_db($conn);
my $coll           = $db->coll("inventory");
my $server_version = server_version($conn);
my $cursor;

# ensure some collections exist
for my $name ( qw/sales records restaurants air_alliances/ ) {
    $db->coll($name)->insert_one({});
}

#<<< No perltidy

subtest "insert" => sub {
    $coll->drop();

    # Start Example 1
    $db->coll("inventory")->insert_one(
        {
            item => "canvas",
            qty  => 100,
            tags => ["cotton"],
            size => { h => 28, w => 35.5, uom => "cm" }
        }
    );
    # End Example 1

    is( $coll->count_documents({}), 1 );

    # Start Example 2
    $cursor = $db->coll("inventory")->find( { item => "canvas" } );
    # End Example 2

    is( scalar $cursor->all, 1 );

    # Start Example 3
    $db->coll("inventory")->insert_many(
        [
            {
                item => "journal",
                qty  => 25,
                tags => [ "blank", "red" ],
                size => { h => 14, w => 21, uom => "cm" }
            },
            {
                item => "mat",
                qty  => 85,
                tags => ["gray"],
                size => { h => 27.9, w => 35.5, uom => "cm" }
            },
            {
                item => "mousepad",
                qty  => 25,
                tags => [ "gel", "blue" ],
                size => { h => 19, w => 22.85, uom => "cm" }
            }
        ]
    );
    # End Example 3

    is( $coll->count_documents({}), 4 );
};

subtest "query_top_level_fields" => sub {
    $coll->drop();

    # Start Example 6
    $db->coll("inventory")->insert_many(
        [
            {
                item   => "journal",
                qty    => 25,
                size   => { h => 14, w => 21, uom => "cm" },
                status => "A"
            },
            {
                item   => "notebook",
                qty    => 50,
                size   => { h => 8.5, w => 11, uom => "in" },
                status => "A"
            },
            {
                item   => "paper",
                qty    => 100,
                size   => { h => 8.5, w => 11, uom => "in" },
                status => "D"
            },
            {
                item   => "planner",
                qty    => 75,
                size   => { h => 22.85, w => 30, uom => "cm" },
                status => "D"
            },
            {
                item   => "postcard",
                qty    => 45,
                size   => { h => 10, w => 15.25, uom => "cm" },
                status => "A"
            }
        ]
    );
    # End Example 6

    is( $coll->count_documents({}), 5 );

    # Start Example 7
    $cursor = $db->coll("inventory")->find( {} );
    # End Example 7

    is( scalar $cursor->all, 5 );

    # Start Example 9
    $cursor = $db->coll("inventory")->find( { status => "D" } );
    # End Example 9

    is( scalar $cursor->all, 2 );

    # Start Example 10
    $cursor = $db->coll("inventory")->find( { status => { '$in' => [ "A", "D" ] } } );
    # End Example 10

    is( scalar $cursor->all, 5 );

    # Start Example 11
    $cursor = $db->coll("inventory")->find( { status => "A", qty => { '$lt' => 30 } } );
    # End Example 11

    is( scalar $cursor->all, 1 );

    # Start Example 12
    $cursor = $db->coll("inventory")->find(
        { '$or' => [ { status => "A" }, { qty => { '$lt' => 30 } } ] }
    );
    # End Example 12

    is( scalar $cursor->all, 3 );

    # Start Example 13
    $cursor = $db->coll("inventory")->find(
        {
            status => "A",
            '$or'  => [ { qty => { '$lt' => 30 } }, { item => { '$regex' => "^p" } } ]
        }
    );
    # End Example 13

    is( scalar $cursor->all, 2 );
};

subtest "query_embedded_documents" => sub {
    $coll->drop();

    # Start Example 14
    # Subdocument key order matters in this example so we have
    # to use Tie::IxHash instead of a regular, unordered Perl hash.
    $db->coll("inventory")->insert_many(
        [
            {
                item   => "journal",
                qty    => 25,
                size   => Tie::IxHash->new( h => 14, w => 21, uom => "cm" ),
                status => "A"
            },
            {
                item   => "notebook",
                qty    => 50,
                size   => Tie::IxHash->new( h => 8.5, w => 11, uom => "in" ),
                status => "A"
            },
            {
                item   => "paper",
                qty    => 100,
                size   => Tie::IxHash->new( h => 8.5, w => 11, uom => "in" ),
                status => "D"
            },
            {
                item   => "planner",
                qty    => 75,
                size   => Tie::IxHash->new( h => 22.85, w => 30, uom => "cm" ),
                status => "D"
            },
            {
                item   => "postcard",
                qty    => 45,
                size   => Tie::IxHash->new( h => 10, w => 15.25, uom => "cm" ),
                status => "A"
            }
        ]
    );
    # End Example 14

    # Start Example 15
    # Subdocument key order matters in this example so we have
    # to use Tie::IxHash instead of a regular, unordered Perl hash.
    $cursor = $db->coll("inventory")->find(
        { size => Tie::IxHash->new( h => 14, w => 21, uom => "cm" ) }
    );
    # End Example 15

    is( scalar $cursor->all, 1 );

    # Start Example 16
    # Subdocument key order matters in this example so we have
    # to use Tie::IxHash instead of a regular, unordered Perl hash.
    $cursor = $db->coll("inventory")->find(
        { size => Tie::IxHash->new( w => 21, h => 14, uom => "cm" ) }
    );
    # End Example 16

    is( scalar $cursor->all, 0 );

    # Start Example 17
    $cursor = $db->coll("inventory")->find( { "size.uom" => "in" } );
    # End Example 17

    is( scalar $cursor->all, 2 );

    # Start Example 18
    $cursor = $db->coll("inventory")->find( { "size.h" => { '$lt' => 15 } } );
    # End Example 18

    is( scalar $cursor->all, 4 );

    # Start Example 19
    $cursor = $db->coll("inventory")->find(
        { "size.h" => { '$lt' => 15 }, "size.uom" => "in", status => "D" }
    );
    # End Example 19

    is( scalar $cursor->all, 1 );
};

subtest "query_arrays" => sub {
    $coll->drop();

    # Start Example 20
    $db->coll("inventory")->insert_many(
        [
            {
                item   => "journal",
                qty    => 25,
                tags   => [ "blank", "red" ],
                dim_cm => [ 14, 21 ]
            },
            {
                item   => "notebook",
                qty    => 50,
                tags   => [ "red", "blank" ],
                dim_cm => [ 14, 21 ]
            },
            {
                item   => "paper",
                qty    => 100,
                tags   => [ "red", "blank", "plain" ],
                dim_cm => [ 14, 21 ]
            },
            {
                item   => "planner",
                qty    => 75,
                tags   => [ "blank", "red" ],
                dim_cm => [ 22.85, 30 ]
            },
            {
                item   => "postcard",
                qty    => 45,
                tags   => ["blue"],
                dim_cm => [ 10, 15.25 ]
            }
        ]
    );
    # End Example 20

    # Start Example 21
    $cursor = $db->coll("inventory")->find( { tags => [ "red", "blank" ] } );
    # End Example 21

    is( scalar $cursor->all, 1 );

    # Start Example 22
    $cursor = $db->coll("inventory")->find( { tags => { '$all' => [ "red", "blank" ] } } );
    # End Example 22

    is( scalar $cursor->all, 4 );

    # Start Example 23
    $cursor = $db->coll("inventory")->find( { tags => "red" } );
    # End Example 23

    is( scalar $cursor->all, 4 );

    # Start Example 24
    $cursor = $db->coll("inventory")->find( { "dim_cm" => { '$gt' => 25 } } );
    # End Example 24

    is( scalar $cursor->all, 1 );

    # Start Example 25
    $cursor = $db->coll("inventory")->find(
        { "dim_cm" => { '$gt' => 15, '$lt' => 20 } }
    );
    # End Example 25

    is( scalar $cursor->all, 4 );

    # Start Example 26
    $cursor = $db->coll("inventory")->find(
        { dim_cm => { '$elemMatch' => { '$gt' => 22, '$lt' => 30 } } }
    );
    # End Example 26

    is( scalar $cursor->all, 1 );

    # Start Example 27
    $cursor = $db->coll("inventory")->find( { "dim_cm.1" => { '$gt' => 25 } } );
    # End Example 27

    is( scalar $cursor->all, 1 );

    # Start Example 28
    $cursor = $db->coll("inventory")->find( { tags => { '$size' => 3 } } );
    # End Example 28

    is( scalar $cursor->all, 1 );
};

subtest "query_array_of_documents" => sub {
    $coll->drop();

    # Start Example 29
    # Subdocument key order matters in this example so we have
    # to use Tie::IxHash instead of a regular, unordered Perl hash.
    $db->coll("inventory")->insert_many(
        [
            {
                item    => "journal",
                instock => [
                    Tie::IxHash->new( warehouse => "A", qty => 5 ),
                    Tie::IxHash->new( warehouse => "C", qty => 15 )
                ]
            },
            {
                item    => "notebook",
                instock => [ Tie::IxHash->new( warehouse => "C", qty => 5 ) ]
            },
            {
                item    => "paper",
                instock => [
                    Tie::IxHash->new( warehouse => "A", qty => 60 ),
                    Tie::IxHash->new( warehouse => "B", qty => 15 )
                ]
            },
            {
                item    => "planner",
                instock => [
                    Tie::IxHash->new( warehouse => "A", qty => 40 ),
                    Tie::IxHash->new( warehouse => "B", qty => 5 )
                ]
            },
            {
                item    => "postcard",
                instock => [
                    Tie::IxHash->new( warehouse => "B", qty => 15 ),
                    Tie::IxHash->new( warehouse => "C", qty => 35 )
                ]
            }
        ]
    );
    # End Example 29

    # Start Example 30
    # Subdocument key order matters in this example so we have
    # to use Tie::IxHash instead of a regular, unordered Perl hash.
    $cursor = $db->coll("inventory")->find(
        { instock => Tie::IxHash->new( warehouse => "A", qty => 5 ) }
    );
    # End Example 30

    is( scalar $cursor->all, 1 );

    # Start Example 31
    # Subdocument key order matters in this example so we have
    # to use Tie::IxHash instead of a regular, unordered Perl hash.
    $cursor = $db->coll("inventory")->find(
        { instock => Tie::IxHash->new( qty => 5, warehouse => "A" ) }
    );
    # End Example 31

    is( scalar $cursor->all, 0 );

    # Start Example 32
    $cursor = $db->coll("inventory")->find( { 'instock.0.qty' => { '$lte' => 20 } } );
    # End Example 32

    is( scalar $cursor->all, 3 );

    # Start Example 33
    $cursor = $db->coll("inventory")->find( { 'instock.qty' => { '$lte' => 20 } } );
    # End Example 33

    is( scalar $cursor->all, 5 );

    # Start Example 34
    $cursor = $db->coll("inventory")->find(
        { instock => { '$elemMatch' => { qty => 5, warehouse => "A" } } }
    );
    # End Example 34

    is( scalar $cursor->all, 1 );

    # Start Example 35
    $cursor = $db->coll("inventory") ->find(
        { instock => { '$elemMatch' => { qty => { '$gt' => 10, '$lte' => 20 } } } }
    );
    # End Example 35

    is( scalar $cursor->all, 3 );

    # Start Example 36
    $cursor = $db->coll("inventory")->find(
        { "instock.qty" => { '$gt' => 10, '$lte' => 20 } }
    );
    # End Example 36

    is( scalar $cursor->all, 4 );

    # Start Example 37
    $cursor = $db->coll("inventory")->find(
        { "instock.qty" => 5, "instock.warehouse" => "A" }
    );
    # End Example 37

    is( scalar $cursor->all, 2 );
};

subtest "query_null" => sub {
    $coll->drop();

    # Start Example 38
    $db->coll("inventory")->insert_many( [ { _id => 1, item => undef }, { _id => 2 } ] );
    # End Example 38

    # Start Example 39
    $cursor = $db->coll("inventory")->find( { item => undef } );
    # End Example 39

    is( scalar $cursor->all, 2 );

    # Start Example 40
    $cursor = $db->coll("inventory")->find( { item => { '$type' => 10 } } );
    # End Example 40

    is( scalar $cursor->all, 1 );

    # Start Example 41
    # For boolean values, use boolean.pm for 'true' and 'false'
    $cursor = $db->coll("inventory")->find( { item => { '$exists' => false } } );
    # End Example 41

    is( scalar $cursor->all, 1 );
};

subtest projection => sub {
    $coll->drop();

    # Start Example 42
    $db->coll("inventory")->insert_many(
        [
            {
                item   => "journal",
                status => "A",
                size   => { h => 14, w => 21, uom => "cm" },
                instock => [ { warehouse => "A", qty => 5 } ]
            },
            {
                item   => "notebook",
                status => "A",
                size   => { h => 8.5, w => 11, uom => "in" },
                instock => [ { warehouse => "C", qty => 5 } ]
            },
            {
                item   => "paper",
                status => "D",
                size   => { h => 8.5, w => 11, uom => "in" },
                instock => [ { warehouse => "A", qty => 60 } ]
            },
            {
                item   => "planner",
                status => "D",
                size   => { h => 22.85, w => 30, uom => "cm" },
                instock => [ { warehouse => "A", qty => 40 } ]
            },
            {
                item    => "postcard",
                status  => "A",
                size    => { h => 10, w => 15.25, uom => "cm" },
                instock => [
                    { warehouse => "B", qty => 15 },
                    { warehouse => "C", qty => 35 }
                ]
            }
        ]
    );
    # End Example 42

    # Start Example 43
    $cursor = $db->coll("inventory")->find( { status => "A" } );
    # End Example 43

    is( scalar $cursor->all, 3 );

    # Start Example 44
    $cursor = $db->coll("inventory")->find(
        { status => "A" }, { projection => { item => 1, status => 1 } }
    );
    # End Example 44

    for my $doc ( $cursor->all ) {
        ok( exists $doc->{_id},      "_id" );
        ok( exists $doc->{item},     "item" );
        ok( exists $doc->{status},   "status" );
        ok( !exists $doc->{size},    "!size" );
        ok( !exists $doc->{instock}, "!instock" );
    }

    # Start Example 45
    $cursor = $db->coll("inventory")->find(
        { status => "A" }, { projection => { item => 1, status => 1, "_id" => 0 } }
    );
    # End Example 45

    for my $doc ( $cursor->all ) {
        ok( !exists $doc->{_id},     "!_id" );
        ok( exists $doc->{item},     "item" );
        ok( exists $doc->{status},   "status" );
        ok( !exists $doc->{size},    "!size" );
        ok( !exists $doc->{instock}, "!instock" );
    }

    # Start Example 46
    $cursor = $db->coll("inventory")->find(
        { status => "A" }, { projection => { status => 0, instock => 0 } }
    );
    # End Example 46

    for my $doc ( $cursor->all ) {
        ok( exists $doc->{_id},      "_id" );
        ok( exists $doc->{item},     "item" );
        ok( !exists $doc->{status},  "!status" );
        ok( exists $doc->{size},     "size" );
        ok( !exists $doc->{instock}, "!instock" );
    }

    # Start Example 47
    $cursor = $db->coll("inventory")->find(
        { status => "A" }, { projection => { item => 1, status => 1, "size.uom" => 1 } }
    );
    # End Example 47

    for my $doc ( $cursor->all ) {
        ok( exists $doc->{_id},      "_id" );
        ok( exists $doc->{item},     "item" );
        ok( exists $doc->{status},   "status" );
        ok( exists $doc->{size},     "size" );
        ok( !exists $doc->{instock}, "!instock" );
        my $size = $doc->{size};
        ok( exists $size->{uom}, "uom" );
        ok( !exists $size->{h},  "!h" );
        ok( !exists $size->{w},  "!w" );
    }

    # Start Example 48
    $cursor = $db->coll("inventory")->find(
        { status => "A" }, { projection => { "size.uom" => 0 } }
    );
    # End Example 48

    for my $doc ( $cursor->all ) {
        ok( exists $doc->{_id},     "_id" );
        ok( exists $doc->{item},    "item" );
        ok( exists $doc->{status},  "status" );
        ok( exists $doc->{size},    "size" );
        ok( exists $doc->{instock}, "instock" );
        my $size = $doc->{size};
        ok( !exists $size->{uom}, "!uom" );
        ok( exists $size->{h},    "h" );
        ok( exists $size->{w},    "w" );
    }

    # Start Example 49
    $cursor = $db->coll("inventory")->find( { status => "A" },
        { projection => { item => 1, status => 1, "instock.qty" => 1 } } );
    # End Example 49

    for my $doc ( $cursor->all ) {
        ok( exists $doc->{_id},     "_id" );
        ok( exists $doc->{item},    "item" );
        ok( exists $doc->{status},  "status" );
        ok( !exists $doc->{size},   "!size" );
        ok( exists $doc->{instock}, "instock" );
        for my $subdoc ( @{ $doc->{instock} } ) {
            ok( !exists $subdoc->{warehouse}, "!warehouse" );
            ok( exists $subdoc->{qty},        "qty" );
        }
    }

    # Start Example 50
    $cursor = $db->coll("inventory")->find(
        { status => "A" },
        { projection => { item => 1, status => 1, instock => { '$slice' => -1 } } }
    );
    # End Example 50

    for my $doc ( $cursor->all ) {
        ok( exists $doc->{_id},     "_id" );
        ok( exists $doc->{item},    "item" );
        ok( exists $doc->{status},  "status" );
        ok( !exists $doc->{size},   "!size" );
        ok( exists $doc->{instock}, "instock" );
        is( scalar @{ $doc->{instock} }, 1 );
    }
};

subtest "update_and_replace" => sub {
    plan skip_all => '$currentDate operator requires MongoDB 2.6+'
      unless $server_version >= v2.6.0;

    $coll->drop();

    # Start Example 51
    $db->coll("inventory")->insert_many(
        [
            {
                item   => "canvas",
                qty    => 100,
                size   => { h => 28, w => 35.5, uom => "cm" },
                status => "A"
            },
            {
                item   => "journal",
                qty    => 25,
                size   => { h => 14, w => 21, uom => "cm" },
                status => "A"
            },
            {
                item   => "mat",
                qty    => 85,
                size   => { h => 27.9, w => 35.5, uom => "cm" },
                status => "A"
            },
            {
                item   => "mousepad",
                qty    => 25,
                size   => { h => 19, w => 22.85, uom => "cm" },
                status => "P"
            },
            {
                item   => "notebook",
                qty    => 50,
                size   => { h => 8.5, w => 11, uom => "in" },
                status => "P"
            },
            {
                item   => "paper",
                qty    => 100,
                size   => { h => 8.5, w => 11, uom => "in" },
                status => "D"
            },
            {
                item   => "planner",
                qty    => 75,
                size   => { h => 22.85, w => 30, uom => "cm" },
                status => "D"
            },
            {
                item   => "postcard",
                qty    => 45,
                size   => { h => 10, w => 15.25, uom => "cm" },
                status => "A"
            },
            {
                item   => "sketchbook",
                qty    => 80,
                size   => { h => 14, w => 21, uom => "cm" },
                status => "A"
            },
            {
                item   => "sketch pad",
                qty    => 95,
                size   => { h => 22.85, w => 30.5, uom => "cm" },
                status => "A"
            }
        ]
    );
    # End Example 51

    # Start Example 52
    # For boolean values, use boolean.pm for 'true' and 'false'
    $db->coll("inventory")->update_one(
        { item => "paper" },
        {
            '$set'         => { "size.uom"   => "cm", status => "P" },
            '$currentDate' => { lastModified => true }
        }
    );
    # End Example 52

    $cursor = $coll->find( { item => "paper" } );
    for my $doc ( $cursor->all ) {
        is( $doc->{size}{uom}, "cm" );
        is( $doc->{status},    "P" );
        ok( exists $doc->{lastModified}, "lastModified" );
    }

    # Start Example 53
    # For boolean values, use boolean.pm for 'true' and 'false'
    $db->coll("inventory")->update_many(
        { qty => { '$lt' => 50 } },
        {
            '$set'         => { "size.uom"   => "in", status => "P" },
            '$currentDate' => { lastModified => true }
        }
    );
    # End Example 53

    $cursor = $coll->find( { qty => { '$lt' => 50 } } );
    for my $doc ( $cursor->all ) {
        is( $doc->{size}{uom}, "in" );
        is( $doc->{status},    "P" );
        ok( exists $doc->{lastModified}, "lastModified" );
    }

    # Start Example 54
    $db->coll("inventory")->replace_one(
        { item => "paper" },
        {
            item    => "paper",
            instock => [ { warehouse => "A", qty => 60 }, { warehouse => "B", qty => 40 } ]
        }
    );
    # End Example 54

    $cursor = $coll->find( { item => "paper" }, { projection => { _id => 0 } } );
    for my $doc ( $cursor->all ) {
        is( scalar keys %$doc, 2 );
        ok( exists $doc->{item},    "item" );
        ok( exists $doc->{instock}, "instock" );
        is( scalar @{ $doc->{instock} }, 2 );
    }
};

subtest delete => sub {
    $coll->drop();

    # Start Example 55
    $db->coll("inventory")->insert_many(
        [
            {
                item   => "journal",
                qty    => 25,
                size   => { h => 14, w => 21, uom => "cm" },
                status => "A"
            },
            {
                item   => "notebook",
                qty    => 50,
                size   => { h => 8.5, w => 11, uom => "in" },
                status => "P"
            },
            {
                item   => "paper",
                qty    => 100,
                size   => { h => 8.5, w => 11, uom => "in" },
                status => "D"
            },
            {
                item   => "planner",
                qty    => 75,
                size   => { h => 22.85, w => 30, uom => "cm" },
                status => "D"
            },
            {
                item   => "postcard",
                qty    => 45,
                size   => { h => 10, w => 15.25, uom => "cm" },
                status => "A"
            }
        ]
    );
    # End Example 55

    is( $coll->count_documents({}), 5 );

    # Start Example 57
    $db->coll("inventory")->delete_many( { status => "A" } );
    # End Example 57

    is( $coll->count_documents({}), 3 );

    # Start Example 58
    $db->coll("inventory")->delete_one( { status => "D" } );
    # End Example 58

    is( $coll->count_documents({}), 2 );

    # Start Example 56
    $db->coll("inventory")->delete_many( {} );
    # End Example 56

    is( $coll->count_documents({}), 0 );
};


subtest "aggregate" => sub {

    # Tests use a $lookup syntax not available untli v3.6.0
    plan skip_all => "Requires MongoDB 3.6"
        unless $server_version >= v3.6.0;

    # Start Aggregation Example 1
    $db->coll("sales")->aggregate(
        [
            { '$match' => { "items.fruit" => "banana" } },
            { '$sort' => { "date" => 1 } },
        ]
    );
    # End Aggregation Example 1

    # Start Aggregation Example 2
    $db->coll("sales")->aggregate(
        [
            { '$unwind' => '$items' },
            { '$match'  => { "items.fruit" => "banana" } },
            {
                '$group' => {
                    _id   => { day    => { '$dayOfWeek' => '$date' } },
                    count => { '$sum' => '$items.quantity' }
                }
            },
            {
                '$project' => {
                    dayOfWeek  => '$_id.day',
                    numberSold => '$count',
                    _id        => 0
                }
            },
            { '$sort' => { 'numberSold' => 1 } },
        ]
    );
    # End Aggregation Example 2

    # Start Aggregation Example 3
    $db->coll("sales")->aggregate(
        [
            { '$unwind' => '$items' },
            {
                '$group' => {
                    _id        => { day    => { '$dayOfWeek' => '$date' } },
                    items_sold => { '$sum' => '$items.quantity' },
                    revenue => { '$sum' => { '$multiply' => [ '$items.quantity', '$items.price' ] } },
                },
            },
            {
                '$project' => {
                    day        => '$_id.day',
                    revenue    => 1,
                    items_sold => 1,
                    discount => {
                        '$cond' => {
                            if   => { '$lte' => [ '$revenue', 250 ] },
                            then => 25,
                            else => 0,
                        },
                    },
                },
            },
        ]
    );
    # End Aggregation Example 3

    # Start Aggregation Example 4
    $db->coll("air_alliances")->aggregate(
        [
            {
                '$lookup' => {
                    from => 'air_airlines',
                    let  => { constituents => '$airlines' },
                    pipeline => [
                        { '$match' => { '$expr' => { '$in' => [ '$name', '$$constituents' ] } } },
                    ],
                    as => 'airlines'
                }
            },
            {
                '$project' => {
                    '_id'    => 0,
                    'name'   => 1,
                    airlines => {
                        '$filter' => {
                            input => '$airlines',
                            as    => 'airline',
                            cond  => { '$eq' => [ '$$airline.country', 'Canada' ] },
                        }
                    }
                }
            }
        ]
    );
    # End Aggregation Example 4

    pass();
};

subtest 'run_command' => sub {
    # Start runCommand Example 1
    $db->run_command([buildInfo => 1]);
    # End runCommand Example 1

    # Start runCommand Example 2
    $db->run_command([collStats => 'restaurants']);
    # End runCommand Example 2

    pass();
};

subtest 'indexing' => sub {

    # Start Index Example 1
    $db->coll("records")->indexes->create_one( [ score => 1 ] );
    # End Index Example 1

    # Start Index Example 2
    $db->coll("restaurants")->indexes->create_one(
        [ cuisine => 1, name => 1 ],
        { partialFilterExpression => { rating => { '$gt' => 5 } } },
    );
    # End Index Example 2

    pass();
};

subtest "causalConsistency" => sub {

    skip_unless_sessions();

    eval {
        $conn->ns("test.items", {read_preference => 'secondary'})->find_one;
    };
    if ($@) {
        plan skip_all => "requires a secondary";
    }

    # Prep for examples
    my $current_date = bson_time();
    my $items = $conn->get_database("test", { w => 'majority' })->get_collection("items");
    $items->drop;
    $items->insert_one(
        {
            sku => 111,
            name  => "Peanuts",
            start => $current_date
        }
    );

    # Start Causal Consistency Example 1

    my $s1 = $conn->start_session({ causalConsistency => 1 });
    $items = $conn->get_database(
        "test", {
            read_concern => { level => 'majority' },
            write_concern => { w => 'majority', wtimeout => 10000 },
        }
    )->get_collection("items");
    $items->update_one(
        {
            sku => 111,
            end  => undef
        },
        {
            '$set' => { end => $current_date}
        },
        {
            session => $s1
        }
    );
    $items->insert_one(
        {
            sku => "nuts-111",
            name  => "Pecans",
            start => $current_date
        },
        {
            session => $s1
        }
    );

    # End Causal Consistency Example 1

    # Despite opening check, sometimes this fails due to read preference
    eval {

    # Start Causal Consistency Example 2

    my $s2 = $conn->start_session({ causalConsistency => 1 });
    $s2->advance_cluster_time( $s1->cluster_time );
    $s2->advance_operation_time( $s1->operation_time );

    $items = $conn->get_database(
        "test", {
            read_preference => 'secondary',
            read_concern => { level => 'majority' },
            write_concern => { w => 'majority', wtimeout => 10000 },
        }
    )->get_collection("items");
    $cursor = $items->find( { end => undef }, { session => $s2 } );

    for my $item ( $cursor->all ) {
        say join(" ", %$item);
    }

    # End Causal Consistency Example 2

    };
    if ($@) {
        unless ( $@ =~ /Could not find host matching read preference/ ) {
            die $@;
        }
    }

    pass();
};

#>>> no perltidy

done_testing;
