<?php

namespace Scandiweb\Models;

class AttributeValue extends Model
{
    protected static string $table = 'attribute_values';

    public static function getByAttributeId(int $attributeId): array
    {
        $rows = (new static)->db->query(
            "SELECT * FROM attribute_values WHERE attribute_id = :id",
            ['id' => $attributeId]
        )->get();

        return array_map(fn($item) => new static($item), $rows);
    }
}