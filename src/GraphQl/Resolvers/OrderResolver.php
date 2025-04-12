<?php

namespace Scandiweb\GraphQl\Resolvers;

use Scandiweb\Models\Order;
use Scandiweb\Models\OrderItem;
use Exception;

class OrderResolver
{
    public static function placeOrder(array $orderData): array
    {
        // Validate required fields
        if (!isset($orderData['items'], $orderData['total_amount'], $orderData['total_currency'])) {
            throw new Exception("Invalid order data.");
        }

        // Step 1: Create the order
        $orderId = Order::create([
            'total_amount'    => $orderData['total_amount'],
            'total_currency'  => $orderData['total_currency'],
            'status'          => $orderData['status'] ?? 'pending',
        ]);

        // Step 2: Insert order items
        foreach ($orderData['items'] as $item) {
            OrderItem::create([
                'order_id'         => $orderId,
                'product_id'       => $item['product_id'] ?? null,
                'product_name'     => $item['product_name'],
                'attribute_values' => $item['attribute_values'],
                'quantity'         => $item['quantity'] ?? 1,
                'paid_amount'      => $item['paid_amount'],
                'paid_currency'    => $item['paid_currency'],
            ]);
        }

        // Step 3: Return the complete order with items
        return Order::findById($orderId);
    }
}
