<?php

declare(strict_types=1);

namespace App\Queries;

class AttributeQuery 
{
    public function selectAttributes(string $table)
    {
        return "SELECT * FROM {$table} WHERE product_id = :id";
    }
}