<?php

namespace App\Contracts;

interface FindByIdInterface
{
    public function findById(int|string $id): ?array;
}
