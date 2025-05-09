<?php

declare(strict_types=1);

namespace Scandiweb;

use Scandiweb\Http\Request;
use Scandiweb\Http\Response;
use Scandiweb\Http\Route;

class Application
{
    protected Route $route;

    public function __construct()
    {
        $this->route = new Route(new Request, new Response);
    }
    
    public function run()
    {
        $this->route->resolve();
    }
}
