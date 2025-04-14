<?php

namespace Scandiweb\GraphQl;

use GraphQL\GraphQL;
use GraphQL\Utils\BuildSchema;
use Scandiweb\GraphQl\Resolvers\ProductResolver;
use Scandiweb\GraphQl\Resolvers\CategoryResolver;
use Scandiweb\GraphQl\Resolvers\OrderResolver;
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
            'products'   => fn() => ProductResolver::getProducts(),
            'product'    => fn($root, $args) => ProductResolver::getProductById($root, $args),
            'categories' => fn() => CategoryResolver::getCategories(),
            'category'   => fn($root, $args) => CategoryResolver::getCategory($root, $args),

            // Mutations
            'placeOrder' => fn($root, $args): array => OrderResolver::placeOrder($args['order']),
        ];
    }

    public function executeQuery(string $query, ?array $variables = null, ?string $operationName = null)
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
