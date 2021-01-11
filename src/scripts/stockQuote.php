<?php
header('Access-Control-Allow-Origin: *');
error_log("url ".dirname(dirname(dirname(__FILE__))). '/credentials.php');
require_once __DIR__ . '../../../credentials.php'; 

use Curl\Curl;
$curl = new Curl();

$data = json_decode(file_get_contents("php://input"), true);

//$quote = $data["quote"];
//error_log('data is '.json_decode($quote));
$quoteUrl = $data["quoteUrl"];
//error_log('data is '.json_decode($quote));
$url = $quoteUrl;


//error_log("URL ".$url);

$curl->get($url, array(
    'apikey' => $FMP_API
));

if ($curl->error) {
    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
} else {
    $data = $curl->response;
}
//error_log("data is ".json_encode($data));
echo(json_encode($data));

?>