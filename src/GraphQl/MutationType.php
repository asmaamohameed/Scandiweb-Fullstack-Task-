<?php

declare(strict_types=1);

namespace App\GraphQL;

use App\GraphQL\Resolvers\OrderResolver;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class MutationType extends ObjectType
{
    public function __construct(TypeRegistry $typeRegistry, OrderResolver $orderResolver)
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => fn() => [
                'placeOrder' => [
                    'type' => $typeRegistry->get('OrderResponse'),
                    'args' => [
                        'order' => [
                            'type' => Type::nonNull(Type::listOf($typeRegistry->get('OrderInput')))
                        ],
                    ],
                    'resolve' => fn($root, array $args): array =>
                    $orderResolver->place($args),
                ],
                'sum' => [
                    'type' => Type::int(),
                    'args' => [
                        'x' => ['type' => Type::int()],
                        'y' => ['type' => Type::int()],
                    ],
                    'resolve' => static fn($rootValue, array $args): int =>
                    $args['x'] + $args['y'],
                ],
            ],
        ]);
    }
}
