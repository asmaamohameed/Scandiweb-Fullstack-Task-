<?php

session_start();

require_once '../vendor/autoload.php';
require_once '../app/Routes/web.php';
require_once '../src/Support/helper.php';
use Scandiweb\Application;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


$app = new Application();

$app->run();
