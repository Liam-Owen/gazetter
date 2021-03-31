<?php

$executionStartTime = microtime(true) / 1000;
 

    $file= 'countryBorders.geo.json';
    $result = file_get_contents($file);
    $data = json_decode($result,TRUE);

    $output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;


    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output); 
?>