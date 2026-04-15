<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Attribute as ODM;

#[ODM\EmbeddedDocument]
class Billing
{
    #[ODM\Field]
    public string $type;

    #[ODM\Field]
    public string $number;
}