<?php

namespace Scandiweb\Models;

class Price extends Model
{
    protected static string $table = 'prices';

    public static function getByProductId(string $productId): array
    {
        $rows = static::query(
            "SELECT * FROM prices WHERE product_id = :id",
            ['id' => $productId]
        );

        return array_map(function ($row) {
            $row['currency'] = json_decode($row['currency'], true);
            return $row;
        }, $rows);
    }
}
