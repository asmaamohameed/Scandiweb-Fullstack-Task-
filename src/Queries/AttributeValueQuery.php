<?php

namespace Scandiweb\Queries;

class AttributeValueQuery 
{
    protected static string $table = 'attribute_values';

    public static function selectAttributeValues()
    {
        return "SELECT * FROM " .static::$table. " WHERE attribute_id = :id";
    }

  

}