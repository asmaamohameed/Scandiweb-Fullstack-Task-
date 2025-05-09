<?php 

declare(strict_types=1);

namespace Scandiweb\View;

class View
{
    public static function render($view, $params=[])
    {
        extract($params);

        include base_path(). 'Views/'.$view.'.php';

    }

}