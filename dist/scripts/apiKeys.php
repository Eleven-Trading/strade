<?php
header('Access-Control-Allow-Origin: *');
error_log("url ".dirname(dirname(dirname(__FILE__))). '/credentials.php');
require_once __DIR__ . '../../../credentials.php';

echo $FMP_API;

?>