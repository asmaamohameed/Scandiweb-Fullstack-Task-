<?php

declare(strict_types=1);

if (!function_exists('dd')) {
    function dd($value)
    {
        echo "<pre>";
        var_dump($value);
        echo "</pre>";
        die();
    }
}

if (!function_exists('base_path')) {
    function base_path()
    {
        return dirname(__DIR__) . '/../';
    }
}

if (!function_exists('abort')) {
    function abort($code = 404, $message = 'Resource not found')
    {
        http_response_code($code);
        die();
    }
}
