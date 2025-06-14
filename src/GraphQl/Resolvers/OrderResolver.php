<?php

declare(strict_types=1);

namespace App\GraphQL\Resolvers;

use App\Models\Order;
use App\Models\Product;

class OrderResolver
{
    protected Order $order;
    protected Product $product;

    public function __construct(Order $order, Product $product)
    {
        $this->order = $order;
        $this->product = $product;
    }

    public function place(array $args): array
    {
        try {
            $orderItems = $args['order'] ?? [];

            $error = $this->validateOrderInput($orderItems);
            if ($error) {
                return ['message' => $error];
            }

            $total = 0;
            $orderDetails = [];

            foreach ($orderItems as $index => $item) {
                $productId = $item['productId'];
                $quantity = (int) ($item['quantity'] ?? 1);

                $product = $this->product->findById($productId);
                if (!$product) {
                    return ['message' => "Product not found for ID: $productId"];
                }

                $price = $product['prices'][0]['amount'] ?? null;
                if (!is_numeric($price)) {
                    return ['message' => "Invalid price for product: $productId"];
                }

                $total += $price * $quantity;

                $orderDetails[] = [
                    'id' => $product['id'],
                    'name' => $product['name'],
                    'quantity' => $quantity,
                    'prices' => $product['prices'],
                    'attributes' => $item['attributeValues'] ?? [],
                ];
            }

            $created = $this->order->create([
                'order_details' => $orderDetails,
                'total' => $total,
                'order_status' => 'received',
            ]);

            return [
                'message' => $created ? 'Order placed successfully!' : 'Failed to place order.',
            ];
        } catch (\Throwable $e) {
            return [
                'message' => 'Internal server error: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Validates the order input structure and data.
     */
    private function validateOrderInput(array $orderItems): ?string
    {
        if (!is_array($orderItems) || empty($orderItems)) {
            return 'Order must contain at least one item.';
        }

        foreach ($orderItems as $index => $item) {
            if (empty($item['productId'])) {
                return "Missing productId at index $index.";
            }

            if (isset($item['quantity']) && !is_numeric($item['quantity'])) {
                return "Invalid quantity at index $index.";
            }
        }

        return null;
    }
}
