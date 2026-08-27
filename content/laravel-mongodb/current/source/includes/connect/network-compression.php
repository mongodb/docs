<?php

// start-all-compression-options
'connections' => [
    'mongodb' => [
        'dsn' => 'mongodb+srv://mongodb0.example.com/',
        'driver' => 'mongodb',
        'database' => 'sample_mflix',
        'options' => [
            'compressors' => 'snappy,zstd,zlib',
        ],
    ],
],
// end-all-compression-options

// start-all-compression-uri
'connections' => [
    'mongodb' => [
        'dsn' => 'mongodb+srv://mongodb0.example.com/?compressors=snappy,zstd,zlib',
        'driver' => 'mongodb',
        'database' => 'sample_mflix',
    ],
],
// end-all-compression-uri

// start-zlib-compression-options
'connections' => [
    'mongodb' => [
        'dsn' => 'mongodb+srv://mongodb0.example.com/',
        'driver' => 'mongodb',
        'database' => 'sample_mflix',
        'options' => [
            'compressors' => 'zlib',
            'zlibCompressionLevel' => 1,
        ],
    ],
],
// end-zlib-compression-options

// start-zlib-compression-uri
'connections' => [
    'mongodb' => [
        'dsn' => 'mongodb+srv://mongodb0.example.com/?compressors=zlib&zlibCompressionLevel=1',
        'driver' => 'mongodb',
        'database' => 'sample_mflix',
    ],
],
// end-zlib-compression-uri
