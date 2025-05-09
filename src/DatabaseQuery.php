<?php

declare(strict_types=1);

namespace Scandiweb;

use Scandiweb\Database\Database;

class DatabaseQuery
{
    private $db;
    private $statement;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function query(string $query, array $params = []): self
    {
        $this->statement = $this->db->prepare($query);
        $this->statement->execute($params);
        return $this;
    }

    public function get(): array
    {
        return $this->statement->fetchAll();
    }

    public function fetch(): array|false
    {
        return $this->statement->fetch();
    }

    public function fetchOrFail(): array
    {
        $result = $this->fetch();

        if (!$result) {
            view(view: 'errors/404');
        }

        return $result;
    }

    public function fetchColumn(): mixed
    {
        return $this->statement->fetchColumn();
    }

    public function rowCount(): int
    {
        return $this->statement->rowCount();
    }

    public function lastInsertId(): string
    {
        return $this->db->lastInsertId();
    }
}
