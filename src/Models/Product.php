<?php

declare(strict_types=1);

namespace Scandiweb\Models;

use Scandiweb\Queries\ProductQuery;

class Product extends Model
{
    public static function getByCategory(?string $category = null): array
    {
        $query = ProductQuery::all();
        $params = [];

        if ($category && strtolower($category) !== 'all') {
            $query = ProductQuery::selectByCategory();
            $params['category'] = strtolower($category);
        }
        $products = static::query($query, $params);
        return array_map([static::class, 'mapProduct'], $products);
    }

    public static function findById(string $id): ?array
    {
        $query = ProductQuery::selectById();
        $params = ['id' => $id];

        $product = static::querySingle($query, $params) ?? null;
        return $product ? static::mapProduct($product) : null;
    }

    private static function mapProduct(array $product): array
    {
        $product['attributes'] = Attribute::getByProductId($product['id']);
        $product['prices'] = Price::getByProductId($product['id']);
        $product['category'] = Category::findById($product['category_id']);
        $product['gallery'] = json_decode($product['gallery'], true) ?? [];
        return $product;
    }
}
