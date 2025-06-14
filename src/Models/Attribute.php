<?php

declare(strict_types=1);

namespace App\Models;

use App\DatabaseQuery;
use App\Queries\AttributeQuery;
use App\Models\AttributeValue;

class Attribute extends Model
{
    private AttributeQuery $attributeQuery;
    private AttributeValue $attributeValueModel;

    public function __construct(
        DatabaseQuery $db,
        AttributeQuery $attributeQuery,
        AttributeValue $attributeValueModel
    ) {
        parent::__construct($db);
        $this->attributeQuery = $attributeQuery;
        $this->attributeValueModel = $attributeValueModel;
    }
    protected function table(): string
    {
        return 'attributes';
    }

    public function getByProductId(string $productId): array
    {
        $query = $this->attributeQuery->selectAttributes($this->table());
        $params = ['id' => $productId];
        $attributes = $this->query($query, $params);

        return array_map([$this, 'mapAttribute'], $attributes);
    }

    private function mapAttribute(array $attribute): array
    {
        $attribute['items'] = $this->attributeValueModel->getByAttributeId((int)$attribute['id']);
        return $attribute;
    }
}
