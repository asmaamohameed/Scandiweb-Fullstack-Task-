<?php

namespace Scandiweb\Models;

class Category extends Model
{
    protected static string $table = 'categories';

    public function setProducts(array $products): void
    {
        $this->attributes['products'] = array_map(fn($p) => new Product($p), $products);
    }
}

