<?php

namespace Scandiweb\Database;

use App\Config\Config;
use PDO;
use PDOException;
use Exception;

class Database
{
    private PDO $pdo;
    private static ?Database $instance = null;

    private function __construct()
    {
        try {
            $dsn = "mysql:host=" . Config::get('DB_HOST') .
                ";dbname=" . Config::get('DB_DATABASE') .
                ";charset=" . Config::get('DB_CHARSET');

            $this->pdo = new PDO(
                $dsn,
                Config::get('DB_USERNAME'),
                Config::get('DB_PASSWORD'),
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            throw new Exception("Database connection error: " . $e->getMessage());
        }
        
    }

    //Returns the single database instance (singleton)
    public static function getInstance(): self
    {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection(): PDO
    {
        return $this->pdo;
    }
}
