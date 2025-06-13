<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class AttributeValueInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeValueInput',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'value' => Type::nonNull(Type::string()),
                'displayValue' => Type::nonNull(Type::string()),
                'selected' => Type::boolean(),
            ],
        ]);
    }
}
