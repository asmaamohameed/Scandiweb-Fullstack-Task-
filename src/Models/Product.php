<?php

declare(strict_types=1);

namespace App\Models;

use App\Contracts\FindByIdInterface;
use App\DatabaseQuery;
use App\Queries\ProductQuery;

class Product extends Model implements FindByIdInterface
{
    private Attribute $attributeModel;
    private Price $priceModel;
    private Category $categoryModel;
    private ProductQuery $productQuery;

    public function __construct(
        DatabaseQuery $db,
        ProductQuery $productQuery,
        Attribute $attributeModel,
        Price $priceModel,
        Category $categoryModel
    ) {
        parent::__construct($db);
        $this->productQuery = $productQuery;
        $this->attributeModel = $attributeModel;
        $this->priceModel = $priceModel;
        $this->categoryModel = $categoryModel;
    }
    protected function table(): string
    {
        return 'products';
    }

    public function getByCategory(?string $category = null): array
    {
        $params = [];
        $query = $this->productQuery->all($this->table());

        if ($category && strtolower($category) !== 'all') {
            $query = $this->productQuery->selectByCategory($this->table());
            $params['category'] = strtolower($category);
        }

        $products = $this->query($query, $params);
        return array_map([$this, 'mapProduct'], $products);
    }

    public function findById(int|string $id): ?array
    {
        $query =$this->productQuery->selectById($this->table());
        $params = ['id' => $id];

        $product = $this->querySingle($query, $params);
        return $product ? $this->mapProduct($product) : null;
    }

    private function mapProduct(array $product): array
    {
        return array_merge($product, [
            'attributes' => $this->attributeModel->getByProductId($product['id']),
            'prices' => $this->priceModel->getByProductId($product['id']),
            'category' => $this->categoryModel->findById($product['category_id']),
            'gallery' => json_decode($product['gallery'], true) ?? [],
        ]);
    }
}
