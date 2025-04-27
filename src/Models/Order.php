<?php

namespace Scandiweb\Models;
use Scandiweb\DatabaseQuery;
class Order extends Model
{
    protected static string $table = 'orders';

    public static function create(array $data): bool
    {
        return (new DatabaseQuery())->query(
            "INSERT INTO orders (order_details, order_status, total, created_at) 
             VALUES (:details, :status, :total, :created_at)",
            [
                'details'    => json_encode($data['order_details']),
                'status'     => $data['order_status'] ?? 'received',
                'total'      => $data['total'],
                'created_at' => date('Y-m-d H:i:s'),
            ]
        )->rowCount() > 0;
    }
}
