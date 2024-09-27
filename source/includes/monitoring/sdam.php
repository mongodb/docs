<?php

require __DIR__ . '/vendor/autoload.php';

// start-mysubscriber
class MySubscriber implements MongoDB\Driver\Monitoring\SDAMSubscriber
{
    private $stream;

    public function __construct($stream)
    {
        $this->stream = $stream;
    }

    public function serverOpening(MongoDB\Driver\Monitoring\ServerOpeningEvent $event): void {
        fprintf(
            $this->stream,
            'Server opening on %s:%s\n',
            $event->getHost(),
            $event->getPort(),
        );
    }

    public function serverClosed(MongoDB\Driver\Monitoring\ServerClosedEvent $event): void {}
    public function serverChanged(MongoDB\Driver\Monitoring\ServerChangedEvent $event): void {}
    public function serverHeartbeatFailed(MongoDB\Driver\Monitoring\ServerHeartbeatFailedEvent $event): void {}
    public function serverHeartbeatStarted(MongoDB\Driver\Monitoring\ServerHeartbeatStartedEvent $event): void {}
    public function serverHeartbeatSucceeded(MongoDB\Driver\Monitoring\ServerHeartbeatSucceededEvent $event): void {}
    public function topologyChanged(MongoDB\Driver\Monitoring\TopologyChangedEvent $event): void {}
    public function topologyClosed(MongoDB\Driver\Monitoring\TopologyClosedEvent $event): void {}
    public function topologyOpening(MongoDB\Driver\Monitoring\TopologyOpeningEvent $event): void {}
}
// end-mysubscriber

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your connection URI');
$client = new MongoDB\Client($uri);

$collection = $client->db->my_coll;

// start-add-sub
$subscriber = new MySubscriber(STDERR);
$client->addSubscriber($subscriber);
// end-add-sub

$collection->insertOne(['x' => 100]);

// start-remove-sub
$client->removeSubscriber($subscriber);
// end-remove-sub