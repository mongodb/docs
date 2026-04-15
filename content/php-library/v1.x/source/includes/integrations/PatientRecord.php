<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Attribute as ODM;
use Doctrine\ODM\MongoDB\Mapping\EncryptQuery;

#[ODM\EmbeddedDocument]
class PatientRecord
{
    #[ODM\Field]
    #[ODM\Encrypt(queryType: EncryptQuery::Equality)]
    public string $ssn;

    #[ODM\EmbedOne(targetDocument: Billing::class)]
    #[ODM\Encrypt]
    public Billing $billing;

    #[ODM\Field]
    public int $billAmount;
}