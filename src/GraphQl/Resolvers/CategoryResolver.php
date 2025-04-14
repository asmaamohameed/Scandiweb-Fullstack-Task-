<?php

namespace Scandiweb\GraphQl\Resolvers;

use Scandiweb\Models\Category;

class CategoryResolver
{
    public static function getCategories()
    {
        return Category::getAll();
    }

    public static function getCategory($root, array $args): ?array
    {
        return Category::findByName($args['name']);
    }
}
