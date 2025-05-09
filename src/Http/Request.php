<?php

declare(strict_types=1);

namespace Scandiweb\Http;

class Request
{
    public function Method()
    {
        $method = strtolower($_SERVER['REQUEST_METHOD']);

        return $method;
    }
    public function path()
    {
        $path = preg_replace('/\/+/', '/', $_SERVER['REQUEST_URI']) ?? '/';

        return str_contains($path, '?') ? explode('?', $path)[0]  : $path;
    }
}
