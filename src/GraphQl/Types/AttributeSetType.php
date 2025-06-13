<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeSetType extends ObjectType
{
    public function __construct(TypeRegistry $registry)
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'fields' => function () use ($registry) {
                return [
                    'id' => Type::nonNull(Type::string()),
                    'name' => Type::nonNull(Type::string()),
                    'type' => Type::nonNull(Type::string()),
                    'items' => Type::listOf($registry->get('AttributeItem')),
                ];
            },
        ]);
    }
}
