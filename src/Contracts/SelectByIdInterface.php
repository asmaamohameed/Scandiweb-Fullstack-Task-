<?php

namespace App\Contracts;

interface SelectByIdInterface
{
    public function selectById(string $table): string;
}
