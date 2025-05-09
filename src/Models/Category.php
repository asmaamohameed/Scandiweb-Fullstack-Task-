<?php

declare(strict_types=1);

namespace Scandiweb\Models;

use Scandiweb\Queries\CategoryQuery;
class Category extends Model
{
    protected static string $table = 'categories';

    public static function findById(int $id): ?array
    {
        $query = CategoryQuery::selectById();
        $params = ['id' => $id];

        return static::querySingle($query, $params) ?? null;
    }

}

