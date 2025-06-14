<?php

declare(strict_types=1);

namespace App\Models;

use App\DatabaseQuery;
use App\Queries\AttributeValueQuery;

class AttributeValue extends Model
{
    private AttributeValueQuery $attributeValueQuery;

    public function __construct(DatabaseQuery $db, AttributeValueQuery $attributeValueQuery)
    {
        parent::__construct($db);
        $this->attributeValueQuery = $attributeValueQuery;
    }
    protected function table(): string
    {
        return 'attribute_values';
    }

    public function getByAttributeId(int $attributeId): array
    {
        $query = $this->attributeValueQuery->selectAttributeValues($this->table());
        $params = ['id' => $attributeId];
        return $this->query($query, $params);
    }
}
