<?php

declare(strict_types=1);

namespace App\Models;

use App\Contracts\FindByIdInterface;
use App\DatabaseQuery;
use App\Queries\CategoryQuery;

class Category extends Model implements FindByIdInterface
{
    private CategoryQuery $categoryQuery;

    public function __construct(DatabaseQuery $db, CategoryQuery $categoryQuery)
    {
        parent::__construct($db);
        $this->categoryQuery = $categoryQuery;
    }
    protected function table(): string
    {
        return 'categories';
    }
    public function findById(int|string $id): ?array
    {
        $query = $this->categoryQuery->selectById($this->table());
        $params = ['id' => $id];

        return $this->querySingle($query, $params) ?? null;
    }
}
