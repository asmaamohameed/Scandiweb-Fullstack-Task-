<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\GraphQLService;
use GraphQL\GraphQL as GraphQLBase;
use RuntimeException;
use Throwable;

class GraphQL
{
    public function handle(): array
    {
        try {
            $schema = (new GraphQLService())->createSchema();

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to read GraphQL input.');
            }

            $input = json_decode($rawInput, true, 512, JSON_THROW_ON_ERROR);
            $query = $input['query'] ?? null;
            $variables = $input['variables'] ?? null;

            if (!$query) {
                throw new RuntimeException('No GraphQL query provided.');
            }

            $result = GraphQLBase::executeQuery(
                $schema,
                $query,
                rootValue: ['prefix' => 'You said: '],
                variableValues: $variables
            );

            $output = $result->toArray(DEBUG_BACKTRACE_PROVIDE_OBJECT | DEBUG_BACKTRACE_IGNORE_ARGS);
        } catch (Throwable $e) {
            $output = [
                'errors' => [[
                    'message' => $e->getMessage(),
                    'trace' => explode("\n", $e->getTraceAsString()),
                ]],
            ];
        }

        return [
            'status' => 200,
            'body' => $output,
        ];
    }
}
