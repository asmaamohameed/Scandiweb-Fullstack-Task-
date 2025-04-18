<?php

namespace App\Http\Controllers;

use Scandiweb\GraphQl\GraphQLHandler;
use Scandiweb\Http\Request;
use Scandiweb\Http\Response;

class GraphQLController
{
    private GraphQLHandler $graphQLHandler;

    public function __construct()
    {
        $this->graphQLHandler = new GraphQLHandler();
    }

    public function index()
    {
        // Safely decode the incoming JSON
        $input = json_decode(file_get_contents('php://input'), true);

        if (!is_array($input) || !isset($input['query'])) {
            Response::statusCode(400);
            echo json_encode(['error' => 'Invalid GraphQL input']);
            return;
        }

        $query = $input['query'];
        $variables = $input['variables'] ?? null;
        $operationName = $input['operationName'] ?? null;

        $result = $this->graphQLHandler->executeQuery($query, $variables, $operationName);

        header('Content-Type: application/json');
        echo json_encode($result);
    }
}
