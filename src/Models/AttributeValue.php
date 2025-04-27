<?php

namespace Scandiweb\Models;

class AttributeValue extends Model
{
    protected static string $table = 'attribute_values';

    public static function getByAttributeId(int $attributeId): array
    {
        return static::query(
            "SELECT * FROM attribute_values WHERE attribute_id = :id",
            ['id' => $attributeId]
        );
    }
}
