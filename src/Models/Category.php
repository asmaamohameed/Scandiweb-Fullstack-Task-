<?php

namespace Scandiweb\Models;

class Category extends Model
{
    protected static string $table = 'categories';

    public static function findById(string $id): ?array
    {
        return static::find($id); 
    }
}

