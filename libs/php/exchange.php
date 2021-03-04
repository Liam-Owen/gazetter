<?php

	$executionStartTime = microtime(true) / 1000;

	$url='https://openexchangerates.org/api/latest.json?app_id=f0ca2b1553e34fab95dd0a8fb6a51373';
    

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_URL,$url);

	$result=curl_exec($curl);

	curl_close($curl);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>