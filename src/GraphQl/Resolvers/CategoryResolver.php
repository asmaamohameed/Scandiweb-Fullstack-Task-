<?php

namespace Scandiweb\GraphQl\Resolvers;

use Scandiweb\Models\Category;
use Scandiweb\Models\Product;

class CategoryResolver
{
    public static function all(): array
    {
        return Category::getAll();
    }

    public static function find(array $args): ?Category
    {
        $category = Category::find($args['id']);

        if ($category) {
            // Load related products
            $products = Product::where('category_id', '=', $category->id);
            $category->products = $products;
        }

        return $category;
    }
}
