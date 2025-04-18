<?php

namespace Scandiweb\Models;

class Order extends Model
{
    protected static string $table = 'orders';

    public static function create(array $data): bool
    {
        return (new static)->db->query(
            "INSERT INTO orders (order_details, order_status, total, created_at) VALUES (:details, :status, :total, :created_at)",
            [
                'details'     => json_encode($data['order_details']),
                'status'      => $data['order_status'] ?? 'received',
                'total'       => $data['total'],
                'created_at'  => date('Y-m-d H:i:s'),
            ]
        )->rowCount() > 0;
    }

    public static function getAll(): array
    {
        $rows = (new static)->db->query("SELECT * FROM " . static::$table)->get();
        return array_map(fn($row) => new static($row), $rows);
    }
}
