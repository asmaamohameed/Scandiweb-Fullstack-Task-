<?php

declare(strict_types=1);

namespace Scandiweb\GraphQL\Resolvers;

use Scandiweb\Models\Product;

class ProductResolver
{
    public static function all(?array $args = []): array
    {
        $category = $args['category'] ?? null;

        return Product::getByCategory($category);
    }

    public static function find(array $args): ?array
    {
        return Product::findById($args['id']);
    }
}
