<?php

require 'vendor/autoload.php';

// start-monolog-logger
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('mongodb-logger');
$logger->pushHandler(new StreamHandler(__DIR__ . '/mongodb.log', Logger::DEBUG));

MongoDB\add_logger($logger);
// end-monolog-logger

// start-custom-logger
class MyLogger extends Psr\Log\AbstractLogger
{
    public array $logs = [];

    public function log(string $level, string|\Stringable $message, array $context = []): void
    {
        $this->logs[] = [$level, $message, $context['domain']];
    }
}

$customLogger = new MyLogger();
MongoDB\add_logger($customLogger);
print_r($customLogger->logs);
// end-custom-logger

// start-remove-logger
MongoDB\remove_logger($logger);
// end-remove-logger
