<?php

declare(strict_types=1);

namespace Scandiweb\Queries;

class PriceQuery 
{
    protected static string $table = 'prices';

    public static function selectPrice()
    {
        return "SELECT * FROM " .static::$table. " WHERE product_id = :id";  
    }
  
}