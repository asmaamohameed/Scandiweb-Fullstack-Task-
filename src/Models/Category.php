<?php

namespace Scandiweb\Models;

use Scandiweb\Queries\CategoryQuery;
class Category extends Model
{
    protected static string $table = 'categories';

    public static function findById(string $id): ?array
    {
        $query = CategoryQuery::selectById();
        $params = ['id' => $id];

        return static::querySingle($query, $params) ?? null;
    }

    
}

