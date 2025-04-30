<?php

namespace Scandiweb\Models;

use Scandiweb\Queries\PriceQuery;

class Price extends Model
{
    public static function getByProductId(string $productId): array
    {
        $query = PriceQuery::selectPrice();
        $params = ['id' => $productId];
        $rows = static::query($query, $params);

        return array_map(function ($row) {
            $row['currency'] = json_decode($row['currency'], true);
            return $row;
        }, $rows);
    }
}
