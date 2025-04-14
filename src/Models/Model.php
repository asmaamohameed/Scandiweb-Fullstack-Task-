<?php

namespace Scandiweb\Models;

use Scandiweb\DatabaseQuery;

abstract class Model
{
    protected static string $table; 
    protected DatabaseQuery $db;

    public function __construct()
    {
       $this->db = new DatabaseQuery();
    }

    public function hydrate(array $data): void
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->{$key} = $value;
            }
        }
    }
    public static function getAll()
    {
        return (new static)->db->query("SELECT * FROM " . static::$table)->get();

    }

    public static function find(string $value, string $column = 'id'): ?array
    {
        return (new static)->db->query(
            "SELECT * FROM " . static::$table . " WHERE {$column} = :value LIMIT 1",
            ['value' => $value]
        )->fetchOrFail();
    }

    public function delete(int|string $id): bool
    {
        $this->db->query("DELETE FROM " . static::$table . " WHERE id = ?", [$id]);
        return true;
    }


    public static function where(string $column, string $operator, $value)
    {
        return (new static)->db->query("SELECT * FROM " . static::$table . " WHERE $column $operator :value", ['value' => $value]);
    }
}
