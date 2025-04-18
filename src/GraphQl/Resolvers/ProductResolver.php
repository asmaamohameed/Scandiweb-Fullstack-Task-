<?php

namespace Scandiweb\GraphQL\Resolvers;

use Scandiweb\Models\Product;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class ProductResolver
{
    public static function all(?array $args = []): array
    {
        $category = $args['category'] ?? null;
        return Product::getByCategory($category);
    }
    
    public static function find(array $args): ?Product
    {
        return Product::findById($args['id']);
    }
}