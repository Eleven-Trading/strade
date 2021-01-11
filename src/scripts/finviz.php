<?php
header('Access-Control-Allow-Origin: *');
require_once __DIR__ . '../../../credentials.php';

$shsFloat = null;
$data = json_decode(file_get_contents("php://input"), true);
if (isset($data["params"]["symbol"])) {
    //error_log("data is ".json_encode($data["params"]["symbol"]));
    $symbol = $data["params"]["symbol"];
}else{
    $symbol = "DMYD";
}

error_log("Symbol is ".$symbol);
$data = $finviz_crawler->quote($symbol);
$finvizData = $data["snapshot"];
//error_log("finviz ".json_encode($finvizData));


$str = $finvizData["Shs Float"];
error_log("Shs Float ".$str);
if(!($str == "-")){
    $arr = preg_split('/(?<=[0-9])(?=[a-z]+)/i',$str);                                                               
    $shsFloatNumber = floatval($arr[0]);
    $shsFloatMult = $arr[1];
    if ($shsFloatMult == "M"){
        $shsFloat = $shsFloatNumber*1000000;
    }
    else if ($shsFloatMult == "B"){
        $shsFloat = $shsFloatNumber*1000000000;
    }
    else if ($shsFloatMult == "K"){
        $shsFloat = $shsFloatNumber*100000;
    }
    else {
        error_log(" -> Unrecognized multiplier ".$shsFloatMult);
    }
}


//error_log("Share float ".$shsFloat);
echo($shsFloat);
