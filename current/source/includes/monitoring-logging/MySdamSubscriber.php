<?php

namespace Monitor;

// start-sdam-subscriber
class MySDAMSubscriber implements MongoDB\Driver\Monitoring\SDAMSubscriber
{
    /** @param resource $stream */
    public function __construct(private $stream)
    {
    }

    public function serverOpening(MongoDB\Driver\Monitoring\ServerOpeningEvent $event): void
    {
        fprintf(
            $this->stream,
            'Server opening on %s:%s\n',
            $event->getHost(),
            $event->getPort(),
            PHP_EOL,
        );
    }

    public function serverClosed(MongoDB\Driver\Monitoring\ServerClosedEvent $event): void
    {
    }

    public function serverChanged(MongoDB\Driver\Monitoring\ServerChangedEvent $event): void
    {
    }

    public function serverHeartbeatFailed(MongoDB\Driver\Monitoring\ServerHeartbeatFailedEvent $event): void
    {
    }

    public function serverHeartbeatStarted(MongoDB\Driver\Monitoring\ServerHeartbeatStartedEvent $event): void
    {
    }

    public function serverHeartbeatSucceeded(MongoDB\Driver\Monitoring\ServerHeartbeatSucceededEvent $event): void
    {
    }

    public function topologyChanged(MongoDB\Driver\Monitoring\TopologyChangedEvent $event): void
    {
    }

    public function topologyClosed(MongoDB\Driver\Monitoring\TopologyClosedEvent $event): void
    {
    }

    public function topologyOpening(MongoDB\Driver\Monitoring\TopologyOpeningEvent $event): void
    {
    }
}
// end-sdam-subscriber
