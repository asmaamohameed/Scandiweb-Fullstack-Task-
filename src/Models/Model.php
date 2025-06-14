<?php

declare(strict_types=1);

namespace App\Models;

use App\DatabaseQuery;

abstract class Model
{
    protected DatabaseQuery $db;
    public function __construct(DatabaseQuery $db)
    {
        $this->db = $db;
    }
    abstract protected function table(): string;
    protected function query(string $sql, array $params = []): array
    {
        return $this->db->query($sql, $params)->get();
    }
    protected function querySingle(string $sql, array $params = []): ?array
    {
        $result = $this->db->query($sql, $params)->fetch();
        return $result ?: null;
    }
    public function getAll(): array
    {
        return $this->query("SELECT * FROM " . $this->table());
    }
}
