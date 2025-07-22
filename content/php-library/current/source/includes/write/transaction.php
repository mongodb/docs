<?php
require 'vendor/autoload.php';

$uri = getenv('MONGODB_URI') ?: throw new RuntimeException('Set the MONGODB_URI variable to your connection URI');
$client = new MongoDB\Client($uri);

// begin-callback
$receipts = $client->bank->receipts;
$checking = $client->bank->checking_accounts;
$saving = $client->bank->saving_accounts;

$accountId = '5678';
$transferAmount = 1000.0;

$callback = function (MongoDB\Driver\Session $session) use (
    $checking,
    $saving,
    $receipts,
    $accountId,
    $transferAmount,
): void {
    $checking->updateOne(
        ['account_id' => $accountId],
        ['$inc' => ['balance' => -$transferAmount]],
        ['session' => $session],
    );

    $saving->updateOne(
        ['account_id' => $accountId],
        ['$inc' => ['balance' => $transferAmount]],
        ['session' => $session],
    );

    $summary = sprintf('SAVINGS +%1$u CHECKING -%1$u', $transferAmount);

    $receipts->insertOne(
        [
            'account_id' => $accountId,
            'summary' => $summary,
            'timestamp' => new MongoDB\BSON\UTCDateTime(),
        ],
        ['session' => $session],
    );

    echo 'Successfully performed transaction!', PHP_EOL;
    echo 'Summary: ', $summary, PHP_EOL;
};
// end-callback

// begin-txn
$session = $client->startSession();

try {
    MongoDB\with_transaction($session, $callback);
} catch (MongoDB\Driver\Exception\RuntimeException $e) {
    echo 'Caught exception: ', $e->getMessage(), PHP_EOL;
}
// end-txn
