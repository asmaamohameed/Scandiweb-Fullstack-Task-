<?php

declare(strict_types=1);

namespace App\GraphQL\Resolvers;

use App\Models\Category;

class CategoryResolver
{
    protected Category $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    public function all(): array
    {
        return $this->category->getAll();
    }

    public function find(array $args): ?array
    {
        return $this->category->findById($args['id']);
    }
}
