<?php

declare(strict_types=1);

namespace Scandiweb\Models;

use Scandiweb\Queries\AttributeValueQuery;

class AttributeValue extends Model
{
    public static function getByAttributeId(int $attributeId): array
    {
        $query = AttributeValueQuery::selectAttributeValues();
        $params = ['id' => $attributeId];
        return static::query($query, $params);

    }
}
