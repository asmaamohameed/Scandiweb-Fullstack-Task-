<?php

namespace Scandiweb\Models;

class Attribute extends Model
{
    protected static string $table = 'attributes';

    public static function getByProductId(string $productId): array
    {
        $rows = static::query(
            "SELECT * FROM attributes WHERE product_id = :id",
            ['id' => $productId]
        );

        return array_map(function ($attr) {
            $attr['items'] = AttributeValue::getByAttributeId($attr['id']);
            return $attr;
        }, $rows);
    }
}
