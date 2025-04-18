<?php

namespace Scandiweb\GraphQl\Resolvers;

use Scandiweb\Models\Order;

class OrderResolver
{
    public static function place(array $args): array
    {
        $order = $args['order'];
        $total = 0;

        foreach ($order as $item) {
            foreach ($item['prices'] as $price) {
                $total += $price['amount'] * ($item['quantity'] ?? 1);
            }
        }

        $success = Order::create([
            'order_details' => $order,
            'total' => $total,
        ]);

        return ['message' => $success ? 'Order placed successfully' : 'Failed to place order'];
    }
}
