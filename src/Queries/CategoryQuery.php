<?php

declare(strict_types=1);

namespace App\Queries;

use App\Contracts\SelectByIdInterface;

class CategoryQuery implements SelectByIdInterface
{
    public function selectById(string $table): string
    {
        return "SELECT * FROM {$table} WHERE id = :id LIMIT 1";
    }
}
