<?php

declare(strict_types=1);

namespace App\Models;

use App\DatabaseQuery;
use App\Queries\OrderQuery;

class Order extends Model
{
    private OrderQuery $orderQuery;

    public function __construct(DatabaseQuery $db, OrderQuery $orderQuery)
    {
        parent::__construct($db);
        $this->orderQuery = $orderQuery;
    }
       protected function table(): string
    {
        return 'orders';
    }
    public function create(array $data): bool
    {
        $query = $this->orderQuery->insertOrder($this->table());
        $params = [
            'details'    => json_encode($data['order_details']),
            'status'     => $data['order_status'] ?? 'received',
            'total'      => $data['total'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        return $this->db->query($query, $params)->rowCount() > 0;
    }
}
