<?php
require __DIR__. '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
use FinvizCrawler\Client;

/***********************************************
 * financialmodelingprep API
 ***********************************************/
$FMP_API = $_ENV["FMP_API"];

/***********************************************
 * FINVIZ API
 ***********************************************/
$finviz_crawler = new Client();

/***********************************************
 * MYSQL
 ***********************************************/
// Variables
//$host = $_ENV["mysqlhost"];

?>