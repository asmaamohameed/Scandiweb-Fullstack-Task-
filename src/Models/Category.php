<?php

namespace Scandiweb\Models;

class Category extends Model
{
    protected static string $table = 'categories';

    protected string $name;

    public static function findByName(string $name): ?array
    {
        return static::find($name); 
    }

    public function __get($name)
    {
        if (property_exists($this, $name)) {
            return $this->{$name};
        }
        return null;
    }
}

