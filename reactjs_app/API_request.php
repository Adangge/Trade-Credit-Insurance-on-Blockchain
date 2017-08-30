<?php
  require_once "/opt/lampp/htdocs/vendor/autoload.php";
  use GuzzleHttp\Client;

  // Sandbox environment endpoint
  $api_base_uri = 'https://api-demo.single-invoice.co/v2.0';

  // Create a client and provide a base URL
  $client = new Client([
    'timeout'   => 8.0,
    'verify'  => false,
    'debug'   => false
  ]);

  try{
    $apikey = "xxxxxxxxxxxxxx";

    $response = $client->request('POST', $api_base_uri."/coverage", [
      'headers' => [ 'apikey' => $apikey ],
      'json' =>   [
              'sellerid' => $_GET["sellerId"],
              'buyerid' => $_GET["buyerId"],
              'invoice' => [
                      "amount" =>  $_GET["invoice_Amount"],
                      "currency" =>  $_GET["invoice_currency"],
                      "dueAt"  =>  $_GET["invoice_dueAt"],
                      "issuedAt"  =>  $_GET["invoice_issueAt"],
                      "number" => "14491-a" // Optional invoice number
                    ]
            ]
    ]);

    // Check the status code returned by the call
    $statusCode = $response->getStatusCode();
    // Get the data
    $data = $response->getBody(true)->getContents();
    //Array
    $array = array(
      "status" => $statusCode,
      "tci" => $data
    );

    echo(json_encode($array));

  }
  catch (GuzzleHttp\Exception\ClientException $e) {
      $response = $e->getResponse();
      $responseBodyAsString = $response->getBody()->getContents();
  }
?>
