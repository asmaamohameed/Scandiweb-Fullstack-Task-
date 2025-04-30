<?php

namespace Scandiweb\Models;

use Scandiweb\Queries\AttributeQuery;

class Attribute extends Model
{
    public static function getByProductId(string $productId): array
    {
        $query = AttributeQuery::selectAttributes();
        $params = ['id' => $productId];

        $rows = static::query($query, $params);
        

        return array_map(function ($attr) {
            $attr['items'] = AttributeValue::getByAttributeId($attr['id']);
            return $attr;
        }, $rows);
    }
}
