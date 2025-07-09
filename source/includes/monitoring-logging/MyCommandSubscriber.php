<?php

namespace Monitor;

// start-command-subscriber
class MyCommandSubscriber implements MongoDB\Driver\Monitoring\CommandSubscriber
{
    /** @param resource $stream */
    public function __construct(private $stream)
    {
    }

    public function commandStarted(MongoDB\Driver\Monitoring\CommandStartedEvent $event): void
    {
        fwrite($this->stream, sprintf(
            'Started command #%d "%s": %s%s',
            $event->getRequestId(),
            $event->getCommandName(),
            MongoDB\BSON\Document::fromPHP($event->getCommand())->toCanonicalExtendedJSON(),
            PHP_EOL,
        ));
    }

    public function commandSucceeded(MongoDB\Driver\Monitoring\CommandSucceededEvent $event): void
    {
    }

    public function commandFailed(MongoDB\Driver\Monitoring\CommandFailedEvent $event): void
    {
    }
}
// end-command-subscriber
