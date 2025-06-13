<?php

declare(strict_types=1);

namespace App\Models;

use App\DatabaseQuery;
use App\Queries\PriceQuery;

class Price extends Model
{
    private PriceQuery $priceQuery;

    public function __construct(DatabaseQuery $db, PriceQuery $priceQuery)
    {
        parent::__construct($db);
        $this->priceQuery = $priceQuery;
    }
    protected function table(): string
    {
        return 'prices';
    }
    public function getByProductId(string $productId): array
    {
        $query = $this->priceQuery->selectPrice($this->table());
        $params = ['id' => $productId];
        $rows = $this->query($query, $params);

        return array_map([$this, 'mapPrice'], $rows);
    }

    private function mapPrice(array $price): array
    {
        $price['currency'] = json_decode($price['currency'], true);
        return $price;
    }
}
