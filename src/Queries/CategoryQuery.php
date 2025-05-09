<?php

declare(strict_types=1);

namespace Scandiweb\Queries;

class CategoryQuery
{
    protected static string $table = 'categories';

    public static function selectById(): string
    {
        return "SELECT * FROM " . static::$table . " WHERE id = :id LIMIT 1";   
    }
    
}