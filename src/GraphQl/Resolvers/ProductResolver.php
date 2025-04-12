<?php

namespace Scandiweb\GraphQL\Resolvers;

use Scandiweb\Models\Product;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class ProductResolver
{
    public static function getProducts(): array
    {
        return Product::getAll();
    }

    public static function getProductById($root, $args): array
    {
        return Product::findById($args['id']);
    }
}
