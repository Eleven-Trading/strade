<?php
header('Access-Control-Allow-Origin: *');
error_log("url ".dirname(dirname(dirname(__FILE__))). '/credentials.php');
//require_once dirname(dirname(dirname(__FILE__))). '/credentials.php';
require_once __DIR__ . '../../../credentials.php'; // is the same as require_once dirname(dirname(dirname(__FILE__))). '/credentials.php'; => you go from current directory and move up 3 times
use Curl\Curl;

$curl = new Curl();

$url = "https://financialmodelingprep.com";

$endpoint = "api/v3/stock-screener";

$curl->get($url."/".$endpoint, array(
    'marketCapLowerThan' => '2000000000', //small cap < 2billion
    'volumeLessThan' => '500000000',
    'exchange' => 'NYSE,NASDAQ,amex',
    'apikey' => $FMP_API
));

if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
} else {
    $data = $curl->response;
}
echo(json_encode($data));

?>