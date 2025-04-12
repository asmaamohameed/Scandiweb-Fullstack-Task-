<?php

session_start();

require_once '../vendor/autoload.php';
require_once '../app/Routes/web.php';
require_once '../src/Support/helper.php';
use Scandiweb\Application;

$app = new Application();

$app->run();
