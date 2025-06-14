<?php

namespace App\Service;

use App\DatabaseQuery;
use App\GraphQL\TypeRegistry;
use App\GraphQL\QueryType;
use App\GraphQL\MutationType;
use App\GraphQL\Resolvers\{ProductResolver, CategoryResolver, OrderResolver};
use App\Models\{Product, Category, Price, Attribute, AttributeValue, Order};
use App\Queries\{ProductQuery, CategoryQuery, PriceQuery, AttributeQuery, AttributeValueQuery, OrderQuery};
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;

class GraphQLService
{
    public function createSchema(): Schema
    {
        $db = new DatabaseQuery();

        $attributeValueModel = new AttributeValue($db, new AttributeValueQuery());
        $attributeModel = new Attribute($db, new AttributeQuery(), $attributeValueModel);
        $priceModel = new Price($db, new PriceQuery());
        $categoryModel = new Category($db, new CategoryQuery());
        $productModel = new Product($db, new ProductQuery(), $attributeModel, $priceModel, $categoryModel);
        $orderModel = new Order($db, new OrderQuery());

        $typeRegistry = new TypeRegistry();
        $typeRegistry->setProductModel($productModel);

        $productResolver = new ProductResolver($productModel);
        $categoryResolver = new CategoryResolver($categoryModel);
        $orderResolver = new OrderResolver($orderModel, $productModel);

        return new Schema(
            (new SchemaConfig())
                ->setQuery(new QueryType($typeRegistry, $productResolver, $categoryResolver))
                ->setMutation(new MutationType($typeRegistry, $orderResolver))
        );
    }
}
