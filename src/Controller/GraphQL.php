<?php

declare(strict_types=1);

namespace App\Controller;

use App\DatabaseQuery;
use App\GraphQL\TypeRegistry;
use App\GraphQL\QueryType;
use App\GraphQL\MutationType;
use App\GraphQL\Resolvers\ProductResolver;
use App\Models\Product;
use App\Models\Category;
use App\Models\Price;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Queries\AttributeQuery;
use App\Queries\AttributeValueQuery;
use App\Queries\CategoryQuery;
use App\Queries\PriceQuery;
use App\Queries\ProductQuery;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;
use App\Models\Order;
use App\Queries\OrderQuery;
use App\GraphQL\Resolvers\OrderResolver;

class GraphQL
{
    public function handle(): array
    {
        try {
            // Setup shared DB handler
            $db = new DatabaseQuery();

            // Setup models with dependencies
            $attributeValueModel = new AttributeValue($db, new AttributeValueQuery());
            $attributeModel = new Attribute($db, new AttributeQuery(), $attributeValueModel);
            $priceModel = new Price($db, new PriceQuery());
            $categoryModel = new Category($db, new CategoryQuery());
            $productModel = new Product($db, new ProductQuery(), $attributeModel, $priceModel, $categoryModel);

            // Setup registry and resolvers
            $typeRegistry = new TypeRegistry();
            $typeRegistry->setProductModel($productModel);
            $orderModel = new Order($db, new OrderQuery());
            $orderResolver = new OrderResolver($orderModel, $productModel);

            $productResolver = new ProductResolver($productModel);
            // You may need to implement or import CategoryResolver if not already present
            $categoryResolver = new \App\GraphQL\Resolvers\CategoryResolver($categoryModel);

            // Build schema
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery(new QueryType($typeRegistry, $productResolver, $categoryResolver))
                    ->setMutation(new MutationType($typeRegistry, $orderResolver)) // Placeholder mutation type
            );

            // Read and validate input
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to read GraphQL input.');
            }

            $input = json_decode($rawInput, true, 512, JSON_THROW_ON_ERROR);

            $query = $input['query'] ?? null;
            if (!$query) {
                throw new RuntimeException('No query provided.');
            }

            $variables = $input['variables'] ?? null;

            // Execute the GraphQL query
            $result = GraphQLBase::executeQuery(
                $schema,
                $query,
                rootValue: ['prefix' => 'You said: '],
                variableValues: $variables
            );

$output = $result->toArray(DEBUG_BACKTRACE_PROVIDE_OBJECT | DEBUG_BACKTRACE_IGNORE_ARGS);        } catch (Throwable $e) {
            $output = [
                'errors' => [
                    [
                        'message' => $e->getMessage(),
                        'trace'   => explode("\n", $e->getTraceAsString()),
                    ]
                ]
            ];
        }

        return [
            'status' => 200,
            'body' => $output,
        ];
    }
}
