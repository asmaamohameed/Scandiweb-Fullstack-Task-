<?php

use  Scandiweb\View\View;
use Scandiweb\Application;

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
if (!function_exists('view')) {
    function view($view, $params = [])
    {
        return View::render($view, $params);
    }
}
if (!function_exists('app')) {
    function app()
    {
        // Store the singleton instance of the Application class
        static $instance = null;

        if (!$instance) {
            $instance = new Application();
        }
        return $instance;
    }
}
if (!function_exists('abort')) {
    function abort($code = 404, $message = 'Resource not found')
    {
        http_response_code($code);

        // header('Content-Type: application/json');
        // echo json_encode(['error' => $message]);

        die();
    }
}
