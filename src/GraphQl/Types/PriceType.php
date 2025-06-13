<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends ObjectType
{
    public function __construct(TypeRegistry $registry)
    {
        parent::__construct([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::nonNull(Type::float()),
                'currency' => Type::nonNull($registry->get('Currency')),
            ]
        ]);
    }
}
