<?php

namespace Scandiweb\Models;

use Scandiweb\DatabaseQuery;

class Product extends Model
{
    protected static string $table = 'products';

    public static function getAll(): array
    {
        // Fetch products along with related data (prices, attributes)
        $products = (new static)->db->query("SELECT * FROM " . static::$table)->get();
        return array_map(fn($product) => static::mapProduct($product), $products);
    }

    public static function findById(string $id): ?array
    {
        $product = (new static)->db->query(
            "SELECT * FROM " . static::$table . " WHERE id = :id",
            ['id' => $id]
        )->fetchOrFail();

        return static::mapProduct($product);
    }

    private static function mapProduct(array $product): array
    {
        $product['attributes'] = Attribute::getByProductId($product['id']);
        $product['prices'] = Price::getByProductId($product['id']);
        $product['category'] = Category::find($product['category_id']);

        return $product;
    }
}
