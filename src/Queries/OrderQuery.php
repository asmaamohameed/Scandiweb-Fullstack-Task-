<?php

declare(strict_types=1);

namespace App\Queries;

class OrderQuery 
{
    public function insertOrder(string $table): string
    {
        return"INSERT INTO {$table} (order_details, order_status, total, created_at) 
                  VALUES (:details, :status, :total, :created_at)";
    }
    
}