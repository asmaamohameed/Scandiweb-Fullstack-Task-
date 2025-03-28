// import { useQuery } from "@apollo/client";
// import { useParams } from "react-router-dom";
// import {GET_PRODUCTS_BY_CATEGORY} from "../GraphQL/Queries";


// const CategoryPage = () => {
//   const { category } = useParams();
//   const { data, loading, error } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
//     variables: { category },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading products</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">{category}</h1>
//       <div className="grid grid-cols-3 gap-4">
//         {data.category.products.map((product ) => (
//           <div key={product.id} className="border p-4">
//             <img src={product.gallery[0]} alt={product.name} className="w-full h-40 object-cover" />
//             <p>{product.name}</p>
//             <p>{product.prices[0].currency} {product.prices[0].amount}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;
