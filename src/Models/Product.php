<?php

namespace Scandiweb\Models;

class Product extends Model
{
    protected static string $table = 'products';

    public static function getAll(): array
    {
        $query = "SELECT * FROM " . static::$table;
        $params = [];

        $products = static::query($query, $params);
        return array_map([static::class, 'mapProduct'], $products);
    }

    public static function getByCategory(?string $category = null): array
    {
        $query = "SELECT * FROM " . static::$table;
        $params = [];

        if ($category && strtolower($category) !== 'all') {
            $query .= " WHERE category_id = (
                SELECT id FROM categories WHERE LOWER(name) = :category
            )";
            $params['category'] = strtolower($category);
        }

        $products = static::query($query, $params);
        return array_map([static::class, 'mapProduct'], $products);
    }
    public static function find(string $value, string $column = 'id'): ?array
    {
        return static::querySingle(
            "SELECT * FROM " . static::$table . " WHERE {$column} = :value LIMIT 1",
            ['value' => $value]
        );
    }

    public static function findById(string $id): ?array
    {
        $product = static::find($id);
        return $product ? static::mapProduct($product) : null;
    }

    private static function mapProduct(array $product): array
    {
        $product['attributes'] = Attribute::getByProductId($product['id']);
        $product['prices'] = Price::getByProductId($product['id']);
        $product['category'] = Category::find($product['category_id']);
        $product['gallery'] = json_decode($product['gallery'], true);
        return $product;
    }
}
