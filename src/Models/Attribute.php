<?php

namespace Scandiweb\Models;

class Attribute extends Model
{
    protected static string $table = 'attributes';

    public static function getByProductId(string $productId): array
    {
        $rows = (new static)->db->query(
            "SELECT * FROM attributes WHERE product_id = :id",
            ['id' => $productId]
        )->get();

        return array_map(function ($attr) {
            $attr['items'] = AttributeValue::getByAttributeId($attr['id']);
            return new static($attr);
        }, $rows);
    }
}
