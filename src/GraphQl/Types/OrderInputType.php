<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderInputType extends InputObjectType
{
    public function __construct(TypeRegistry $registry)
    {
        parent::__construct([
            'name' => 'OrderInput', // this name must match exactly
            'fields' => [
                'productId' => Type::nonNull(Type::string()),
                'quantity' => Type::nonNull(Type::int()),
                'attributeValues' => Type::listOf($registry->get('AttributeValueInput')),
            ],
        ]);
    }
}
