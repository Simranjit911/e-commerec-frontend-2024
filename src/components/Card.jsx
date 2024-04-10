import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const nav = useNavigate();

  return (
    <div className="group cursor-pointer md:max-h-[300px] max-h-[200px] flex flex-col justify-center items-center mx-6 bg-blue-200 hover:bg-blue-400 rounded-md hover:scale-105 duration-300 md:p-3 p-2 shadow-xl md:my-8 hover:shadow-2xl pb-1 " onClick={() => nav("/allproducts")}>
    <div className="w-[100%] md:h-[240px] h-[150px]">
      <img
        src={product.images[0].url}
        alt={product.name}
        className="object-cover w-full h-full rounded-md"
      />
    </div>
    <div className="md:text-2xl text-xl text-black group-hover:text-gray-100">
      {product.name}
    </div>
  </div>
  
  );
}

export default Card;
{
  /* <div className="group relative md:w-64 w-48 md:h-80 overflow-hidden rounded-lg shadow-lg hover:shadow-xl cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 mx-5 drop-shadow-xl"  onClick={() => nav("/allproducts")}>
{product.images && product.images[0] && product.name && (
  <>
    <img
   
      src={product.images[0].url}
      alt={product.name}
      className="h-full w-full object-cover rounded-lg group-hover:brightness-75 transition duration-300 ease-in-out drop-shadow-2xl"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-transparent opacity-0 group-hover:opacity-75 transition duration-300 ease-in-out">
      <p className="absolute bottom-2 left-4 text-lg font-semibold text-blue-600 text-center py-2 px-4 rounded-lg">
        {product.name}
      </p>
    </div>
  </>
)}
</div> */
}
