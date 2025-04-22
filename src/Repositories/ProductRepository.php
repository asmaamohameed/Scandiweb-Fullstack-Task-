<?php 

namespace Scandiweb\Repositories;

use Scandiweb\Models\Product;
use Scandiweb\DatabaseQuery;

class ProductRepository{
    protected static string $table;
    protected DatabaseQuery $db;

    public function __construct()
    {
        $this->db = new DatabaseQuery();
    }

    public static function getAll(): array
    {
        $results = (new static)->db->query("SELECT * FROM " . static::$table)->get();
        return array_map(fn($row) => new static($row), $results);
    }

    public static function find(string $value, string $column = 'id'): ?static
    {
        $row = (new static)->db->query(
            "SELECT * FROM " . static::$table . " WHERE {$column} = :value LIMIT 1",
            ['value' => $value]
        )->fetchOrFail();

        return new static($row);
    }

    public static function where(string $column, string $operator, $value): array
    {
        $results = (new static)->db->query(
            "SELECT * FROM " . static::$table . " WHERE {$column} {$operator} :value",
            ['value' => $value]
        )->get();

        return array_map(fn($row) => new static($row), $results);
    }

}