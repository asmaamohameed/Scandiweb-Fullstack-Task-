<?php

namespace Scandiweb\Http;

class Response
{
    public static function statusCode($code = 404)
    {
        return http_response_code($code);
    }
    
    public static function redirect($url)
    {
        header("Location: $url");
    }
}
