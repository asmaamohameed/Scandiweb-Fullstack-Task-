<?php

declare(strict_types=1);

namespace App\Queries;

class CategoryQuery
{
    public function selectById(string $table): string
    {
        return "SELECT * FROM {$table} WHERE id = :id LIMIT 1";   
    }
    
}