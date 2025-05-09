<?php

declare(strict_types=1);

namespace Scandiweb\Models;

use Scandiweb\Queries\PriceQuery;

class Price extends Model
{
    public static function getByProductId(string $productId): array
    {
        $query = PriceQuery::selectPrice();
        $params = ['id' => $productId];
        $rows = static::query($query, $params);

        return array_map([static::class, 'mapPrice'], $rows);
    }
    private static function mapPrice(array $price): array
    {
        $price['currency'] = json_decode($price['currency'], true);
        return $price;
    }

}
