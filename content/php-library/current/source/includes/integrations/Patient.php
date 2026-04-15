<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Attribute as ODM;

#[ODM\Document(collection: 'patients')]
class Patient
{
    #[ODM\Id]
    public string $id;

    #[ODM\Field]
    public string $patientName;

    #[ODM\Field]
    public int $patientId;

    #[ODM\EmbedOne(targetDocument: PatientRecord::class)]
    public PatientRecord $patientRecord;
}