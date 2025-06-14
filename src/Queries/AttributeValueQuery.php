<?php

declare(strict_types=1);

namespace App\Queries;

class AttributeValueQuery
{
    public function selectAttributeValues(string $table): string
    {
        return "SELECT * FROM {$table} WHERE attribute_id = :id";
    }
}
