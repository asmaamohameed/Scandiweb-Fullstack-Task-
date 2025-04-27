<?php

namespace Scandiweb\GraphQl\Resolvers;

use Scandiweb\Models\Category;
use Scandiweb\Queries\BaseQuery;

class CategoryResolver
{
    public static function all(): array
    {
        return Category::getAll();
    }
}
