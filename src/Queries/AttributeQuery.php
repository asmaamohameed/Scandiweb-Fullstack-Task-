<?php

declare(strict_types=1);

namespace Scandiweb\Queries;

class AttributeQuery 
{
    protected static string $table = 'attributes';

    public static function selectAttributes()
    {
        return "SELECT * FROM ".static::$table." WHERE product_id = :id";
    }
}