<?php

declare(strict_types=1);

namespace App\GraphQL;

use App\GraphQL\Types\{
    ProductType,
    PriceType,
    CurrencyType,
    AttributeSetType,
    AttributeType,
    CategoryType,
    AttributeValueInputType,
    OrderInputType,
    OrderResponseType
};
use App\Models\{
    Order,
    Product
};
use GraphQL\Type\Definition\Type;

class TypeRegistry
{
    private array $types = [];

    private ?Order $orderModel = null;
    private ?Product $productModel = null;

    public function get(string $name): Type
    {
        if (!isset($this->types[$name])) {
            $this->types[$name] = $this->create($name);
        }

        return $this->types[$name];
    }

    private function create(string $name): Type
    {
        return match ($name) {
            'Product'             => new ProductType($this),
            'Price'               => new PriceType($this),
            'Currency'            => new CurrencyType(),
            'AttributeSet'        => new AttributeSetType($this),
            'AttributeItem'       => new AttributeType(),
            'Category'            => new CategoryType(),
            'AttributeValueInput' => new AttributeValueInputType(),
            'OrderInput'          => new OrderInputType($this),
            'OrderResponse'       => new OrderResponseType(),
            default               => throw new \Exception("Unknown type: $name"),
        };
    }

    public function setOrderModel(Order $order): void
    {
        $this->orderModel = $order;
    }

    public function getOrderModel(): Order
    {
        if (!$this->orderModel) {
            throw new \RuntimeException('Order model not set in TypeRegistry.');
        }
        return $this->orderModel;
    }

    public function setProductModel(Product $product): void
    {
        $this->productModel = $product;
    }

    public function getProductModel(): Product
    {
        if (!$this->productModel) {
            throw new \RuntimeException('Product model not set in TypeRegistry.');
        }
        return $this->productModel;
    }
}
