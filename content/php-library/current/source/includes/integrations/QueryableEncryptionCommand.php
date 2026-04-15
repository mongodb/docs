<?php

namespace App\Command;

use App\Document\Billing;
use App\Document\Patient;
use App\Document\PatientRecord;
use Doctrine\ODM\MongoDB\Configuration;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Mapping\Driver\AttributeDriver;
use MongoDB\BSON\Binary;
use MongoDB\Client;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:queryable-encryption',
    description: 'Demonstrates Queryable Encryption with '
        . 'Doctrine MongoDB ODM',
)]
class QueryableEncryptionCommand extends Command
{
    protected function execute(
        InputInterface $input,
        OutputInterface $output,
    ): int {
        // start-app-vars
        // Paste application variables below
        $keyVaultNamespace = 'encryption.__keyVault';
        $encryptedDatabase = 'medicalRecords';
        $encryptedCollection = 'patients';
        // end-app-vars

        // start-cmk
        // Paste encryption credentials below
        $keyFile = __DIR__ . '/../../master-key.bin';
        if (!file_exists($keyFile)) {
             file_put_contents($keyFile, random_bytes(96));
        }
        $masterKeyBytes = file_get_contents($keyFile);

        $kmsProvider = [
             'type' => 'local',
             'key' => new Binary(
                 $masterKeyBytes,
                 Binary::TYPE_GENERIC,
             ),
        ];
        // end-cmk
        // start-auto-encrypt
        $autoEncryptionOptions = [
             'keyVaultNamespace' => $keyVaultNamespace,
        ];

        $cryptSharedLibPath = $_ENV['CRYPT_SHARED_LIB_PATH'] ?? '';
        if ($cryptSharedLibPath) {
             $autoEncryptionOptions['extraOptions'] = [
                 'cryptSharedLibPath' => $cryptSharedLibPath,
             ];
        }
        // end-auto-encrypt

        // start-connection-config
        // Paste connection and configuration below
        $cacheDir = __DIR__ . '/../../var/cache/doctrine';
        $config = new Configuration();
        $config->setAutoEncryption($autoEncryptionOptions);
        $config->setKmsProvider($kmsProvider);
        $config->setProxyDir($cacheDir . '/Proxies');
        $config->setProxyNamespace('Proxies');
        $config->setHydratorDir($cacheDir . '/Hydrators');
        $config->setHydratorNamespace('Hydrators');
        $config->setDefaultDB($encryptedDatabase);
        $config->setMetadataDriverImpl(
             new AttributeDriver([__DIR__ . '/../Document'])
        );

        $client = new Client(
             uri: $_ENV['MONGODB_URI'],
             uriOptions: [],
             driverOptions: $config->getDriverOptions(),
        );

        $dm = DocumentManager::create($client, $config);
        // end-connection-config

        // start-collection-setup
        // Paste collection setup below
        $schemaManager = $dm->getSchemaManager();
        $schemaManager->dropDocumentCollection(Patient::class);
        $schemaManager->createDocumentCollection(Patient::class);
        // end-collection-setup

        // start-insert
        // Paste insert operation below
        $billing = new Billing();
        $billing->type = 'Visa';
        $billing->number = '4111111111111111';

        $record = new PatientRecord();
        $record->ssn = '987-65-4320';
        $record->billing = $billing;
        $record->billAmount = 1500;

        $patient = new Patient();
        $patient->patientName = 'Jon Doe';
        $patient->patientId = 12345678;
        $patient->patientRecord = $record;

        $dm->persist($patient);
        $dm->flush();
        $dm->clear();

        $output->writeln(
             'Successfully inserted the patient document.'
        );
        // end-insert

        // start-query
        // Paste encrypted query below
        $found = $dm
             ->getRepository(Patient::class)
             ->findOneBy(['patientRecord.ssn' => '987-65-4320']);

        if ($found instanceof Patient) {
             $output->writeln('Found patient:');
             $output->writeln(
                 '  Name: ' . $found->patientName
             );
             $output->writeln(
                 '  SSN: ' . $found->patientRecord->ssn
             );
             $output->writeln(
                 '  Billing type: '
                 . $found->patientRecord->billing->type
             );
             $output->writeln(
                 '  Billing number: '
                 . $found->patientRecord->billing->number
             );
             $output->writeln(
                 '  Bill amount: '
                 . $found->patientRecord->billAmount
             );
        }

        $output->writeln('Connection closed.');
        // end-query

        return Command::SUCCESS;
    }
}