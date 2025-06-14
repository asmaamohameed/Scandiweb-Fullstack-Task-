<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class ProductType extends ObjectType
{
    public function __construct(TypeRegistry $registry)
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => function () use ($registry) {
                return [
                    'id' => Type::nonNull(Type::string()),
                    'name' => Type::nonNull(Type::string()),
                    'inStock' => Type::nonNull(Type::boolean()),
                    'gallery' => Type::listOf(Type::string()),
                    'description' => Type::string(),
                    'category' => $registry->get('Category'),
                    'brand' => Type::nonNull(Type::string()),
                    'prices' => Type::listOf($registry->get('Price')),
                    'attributes' => Type::listOf($registry->get('AttributeSet')),
                ];
            }
        ]);
    }
}
