<?php

namespace Scandiweb\Models;

use Scandiweb\DatabaseQuery;

abstract class Model
{
    protected static string $table;
    protected static DatabaseQuery $db;

    protected static function db(): DatabaseQuery
    {
        if (!isset(self::$db)) {
            self::$db = new DatabaseQuery();
        }

        return self::$db;
    }

    protected static function query(string $sql, array $params = []): array
    {
        return self::db()->query($sql, $params)->get();
    }

    protected static function querySingle(string $sql, array $params = []): ?array
    {
        $result = self::db()->query($sql, $params)->fetch();
        return $result ?: null;
    }
    public static function getAll(): array
    {
        return self::query("SELECT * FROM " . static::$table);
    }
   
    public static function find(string $value, string $column = 'id'): ?array
    {
        return self::querySingle(
            "SELECT * FROM " . static::$table . " WHERE {$column} = :value LIMIT 1",
            ['value' => $value]
        );
    }
}
