<?php

declare(strict_types=1);

namespace Scandiweb\Models;

use Scandiweb\Queries\AttributeQuery;

class Attribute extends Model
{
    public static function getByProductId(string $productId): array
    {
        $query = AttributeQuery::selectAttributes();
        $params = ['id' => $productId];
        $rows = static::query($query, $params);

        return array_map([static::class, 'mapAttribute'], $rows);
    }
    private static function mapAttribute(array $attribute): array
    {
        $attribute['items'] = AttributeValue::getByAttributeId((int) $attribute['id']);
        return $attribute;
    }
}
