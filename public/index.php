<?php

use Scandiweb\Database\Database;

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

require_once '../vendor/autoload.php';
require_once '../app/Routes/web.php';
require_once '../src/Support/helper.php';
use Dotenv\Dotenv;
use Scandiweb\Application;

// Load environment variables
$dotenv = Dotenv::createImmutable(base_path()); 
$dotenv->load();

$app = new Application();

phpinfo();
$app->run();


