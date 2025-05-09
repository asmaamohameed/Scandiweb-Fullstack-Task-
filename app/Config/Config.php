<?php 
namespace App\Config;

class Config
{
    private static $setting = [
        'DB_HOST' => 'localhost',
        'DB_USERNAME' => 'root',
        'DB_PASSWORD' => '',
        'DB_DATABASE' => 'scandiweb_ecommerce_task',
        'DB_CHARSET' => 'utf8mb4',
    ];
    public static function get($key)
    {
        return self::$setting[$key] ?? null;
    }
}