<?php

namespace Scandiweb\GraphQl;

use GraphQL\GraphQL;
use GraphQL\Utils\BuildSchema;
use Scandiweb\GraphQL\Resolvers\ProductResolver;
use Scandiweb\GraphQL\Resolvers\CategoryResolver;
use Scandiweb\GraphQL\Resolvers\OrderResolver;
use GraphQL\Type\Schema;
use Throwable;

class GraphQLHandler
{
    private Schema $schema;
    private array $rootValue;

    public function __construct()
    {
        $this->loadSchema();
        $this->setResolvers();
    }

    private function loadSchema(): void
    {
        $schemaString = file_get_contents(__DIR__ . '/schema.graphql');
        $this->schema = BuildSchema::build($schemaString);
    }

    private function setResolvers(): void
    {
        $this->rootValue = [
            // Queries
            'products' => fn($root, $args) => ProductResolver::all($args),
            'product'    => fn($root, $args) => ProductResolver::find($args),
            'categories' => fn() => CategoryResolver::all(),
            'category'   => fn($root, $args) => CategoryResolver::find($args),

            // Mutations
            'placeOrder' => fn($root, $args): array => OrderResolver::place($args),
        ];
    }

    public function executeQuery(string $query, ?array $variables = null, ?string $operationName = null): array
    {
        try {
            return GraphQL::executeQuery(
                $this->schema,
                $query,
                $this->rootValue,
                null,
                $variables,
                $operationName
            )->toArray();
        } catch (Throwable $e) {
            return [
                'errors' => [
                    ['message' => $e->getMessage()],
                ],
            ];
        }
    }
}
