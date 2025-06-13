<?php

declare(strict_types=1);

namespace App\GraphQL;

use App\GraphQL\Resolvers\ProductResolver;
use App\GraphQL\Resolvers\CategoryResolver;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class QueryType extends ObjectType
{
    public function __construct(
        TypeRegistry $typeRegistry,
        ProductResolver $productResolver,
        CategoryResolver $categoryResolver
    ) {
        parent::__construct([
            'name' => 'Query',
            'fields' => fn() => [
                'echo' => [
                    'type' => Type::string(),
                    'args' => [
                        'message' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn($rootValue, array $args): string =>
                    $rootValue['prefix'] . $args['message'],
                ],
                'products' => [
                    'type' => Type::listOf($typeRegistry->get('Product')),
                    'args' => [
                        'category' => ['type' => Type::string()],
                    ],
                    'resolve' => fn($root, $args) => $productResolver->all($args),
                ],
                'product' => [
                    'type' => $typeRegistry->get('Product'),
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::id())],
                    ],
                    'resolve' => fn($root, $args) => $productResolver->find($args),
                ],
                'categories' => [
                    'type' => Type::listOf($typeRegistry->get('Category')),
                    'resolve' => fn() => $categoryResolver->all(),
                ],
                'category' => [
                    'type' => $typeRegistry->get('Category'),
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => fn($root, $args) => $categoryResolver->find($args),
                ],
            ],
        ]);
    }
}
