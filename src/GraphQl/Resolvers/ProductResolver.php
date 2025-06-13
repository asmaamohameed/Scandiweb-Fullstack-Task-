<?php

declare(strict_types=1);

namespace App\GraphQL\Resolvers;

use App\Models\Product;

class ProductResolver
{
    protected Product $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }
    public function all(?array $args = []): array
    {
        $category = $args['category'] ?? null;

        return $this->product->getByCategory($category);
    }

    public function find(array $args): ?array
    {
        $product = $this->product->findById($args['id']);
        if (!$product) {
            throw new \Exception("Product not found with ID {$args['id']}");
        }

        return $product;
    }
}
