<?php

namespace Scandiweb\Models;

class Price extends Model
{
    protected static string $table = 'prices';

    public static function getByProductId(string $productId): array
    {
        $rows = (new static)->db->query(
            "SELECT * FROM prices WHERE product_id = :id",
            ['id' => $productId]
        )->get();

        return array_map(function ($row) {
            $row['currency'] = json_decode($row['currency'], true);
            return new static($row);
        }, $rows);
    }
}
