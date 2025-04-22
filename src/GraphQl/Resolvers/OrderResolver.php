<?php

namespace Scandiweb\GraphQl\Resolvers;

use Scandiweb\Models\Order;

class OrderResolver
{
    public static function place(array $args): array
    {
        $orderItems = $args['order'];
        $total = 0;

        foreach ($orderItems as $item) {
            foreach ($item['prices'] as $price) {
                $total += $price['amount'] * ($item['quantity'] ?? 1);
            }
        }

        $created = Order::create([
            'order_details' => $orderItems,
            'total' => $total,
            'order_status' => 'received'
        ]);

        return [
            'message' => $created ? 'Order placed successfully!' : 'Failed to place order.',
        ];    }
}
