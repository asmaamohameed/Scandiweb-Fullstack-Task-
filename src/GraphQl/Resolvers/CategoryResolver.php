<?php

declare(strict_types=1);

namespace Scandiweb\GraphQL\Resolvers;

use Scandiweb\Models\Category;

class CategoryResolver
{
    public static function all(): array
    {
        return Category::getAll();
    }

    public static function find(array $args): ?array
    {
        return Category::findById($args['id']);
    }
    
}
