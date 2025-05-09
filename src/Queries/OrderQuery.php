<?php

declare(strict_types=1);

namespace Scandiweb\Queries;

class OrderQuery 
{
    protected static string $table = 'orders';

    public static function insertOrder()
    {
        return"INSERT INTO  " .static::$table. " (order_details, order_status, total, created_at) 
                  VALUES (:details, :status, :total, :created_at)";
    }
    
}