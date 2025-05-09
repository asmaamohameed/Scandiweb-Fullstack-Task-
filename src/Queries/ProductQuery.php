<?php

declare(strict_types=1);

namespace Scandiweb\Queries;

class ProductQuery
{
    protected static string $table = 'products';

    public static function all(): string
    {
        return "SELECT * FROM " . static::$table;
    }

    public static function selectByCategory(): string
    {
        return "SELECT * FROM " . static::$table . " WHERE category_id = (
        SELECT id FROM categories WHERE LOWER(name) = :category)";
    }

    public static function selectById(): string
    {
        return "SELECT * FROM " . static::$table . " WHERE id = :id LIMIT 1";
        
    }

}
