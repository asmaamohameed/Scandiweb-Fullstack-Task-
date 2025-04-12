<?php

namespace Scandiweb\GraphQl\Resolvers;

use Scandiweb\Models\Category;

class CategoryResolver
{
    public static function getCategories()
    {
        return Category::getAll();
    }

    public static function getCategoryById($root, array $args): ?array
    {
        return Category::findById($args['id']);
    }
}
