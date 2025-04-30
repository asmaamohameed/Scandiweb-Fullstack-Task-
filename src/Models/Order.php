<?php

namespace Scandiweb\Models;
use Scandiweb\DatabaseQuery;
use Scandiweb\Queries\OrderQuery;
class Order extends Model
{
    public static function create(array $data): bool
    {
        $query = OrderQuery::insertOrder();
        $params = [
            'details'    => json_encode($data['order_details']),
            'status'     => $data['order_status'] ?? 'received',
            'total'      => $data['total'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        return (new DatabaseQuery())->query($query,$params)->rowCount() > 0;
    }
}
