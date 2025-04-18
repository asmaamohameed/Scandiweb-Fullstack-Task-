<?php

namespace Scandiweb\Models;

class Product extends Model
{
    protected static string $table = 'products';

    public static function getAll(): array
    {
        $products = (new static)->db->query("SELECT * FROM " . static::$table)->get();
        return array_map(fn($product) => static::mapProduct($product), $products);
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

        $products = (new static)->db->query($query, $params)->get();

        return array_map(fn($product) => static::mapProduct($product), $products);
    }


    public static function findById(string $id): ?static
    {
        $product = (new static)->db->query(
            "SELECT * FROM " . static::$table . " WHERE id = :id",
            ['id' => $id]
        )->fetchOrFail();    
        return new static(static::mapProduct($product));
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
