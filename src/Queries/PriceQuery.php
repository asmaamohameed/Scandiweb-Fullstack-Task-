<?php

declare(strict_types=1);

namespace App\Queries;

class PriceQuery 
{
    public function selectPrice(string $table)
    {
        return "SELECT * FROM {$table} WHERE product_id = :id";  
    }
  
}