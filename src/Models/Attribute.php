<?php

namespace Scandiweb\Models;

class Attribute extends Model
{
    protected static string $table = 'attributes';

    public static function getByProductId(string $productId): array
    {
        return (new static)->db->query(
            "SELECT * FROM " . static::$table . " WHERE product_id = :product_id",
            ['product_id' => $productId]
        )->get();
    }
}
