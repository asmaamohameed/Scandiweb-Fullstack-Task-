<?php

namespace Scandiweb\Models;

use Scandiweb\DatabaseQuery;

abstract class Model
{
    protected static string $table;
    protected DatabaseQuery $db;
    protected array $attributes = [];

    public function __construct(array $data = [])
    {
        $this->db = new DatabaseQuery();
        $this->fill($data);
    }

    // ─────────────────────────────────────────────
    // Data Hydration and Property Magic
    // ─────────────────────────────────────────────

    public function fill(array $data): void
    {
        foreach ($data as $key => $value) {
            $method = 'set' . str_replace(' ', '', ucwords(str_replace(['_', '-'], ' ', $key)));

            if (method_exists($this, $method)) {
                $this->$method($value);
            } else {
                $this->attributes[$key] = $value;
            }
        }
    }

    public function __get(string $key)
    {
        return $this->attributes[$key] ?? null;
    }

    public function __set(string $key, $value): void
    {
        $this->attributes[$key] = $value;
    }

    public function toArray(): array
    {
        return $this->attributes;
    }

    // ─────────────────────────────────────────────
    // DB Static Accessors
    // ─────────────────────────────────────────────

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

    public function delete(int|string $id): bool
    {
        $this->db->query("DELETE FROM " . static::$table . " WHERE id = ?", [$id]);
        return true;
    }
}
