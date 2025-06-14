<?php

declare(strict_types=1);

namespace App\Queries;

use App\Contracts\SelectByIdInterface;

class ProductQuery implements SelectByIdInterface
{
    public function all(string $table): string
    {
        return "SELECT * FROM {$table}";
    }

    public function selectByCategory(string $table): string
    {
        return "SELECT * FROM {$table} WHERE category_id = (
        SELECT id FROM categories WHERE LOWER(name) = :category)";
    }

    public function selectById(string $table): string
    {
        return "SELECT * FROM {$table}  WHERE id = :id LIMIT 1";
    }
}
