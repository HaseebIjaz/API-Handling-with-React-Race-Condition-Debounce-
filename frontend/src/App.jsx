import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

// const useCustomReactQuery = (url, deps = []) => {
//   console.log("search");
//   const [products, setProducts] = useState([]);
//   const [error, seterror] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const controller = new AbortController();
//     (async () => {
//       try {
//         setLoading(true);
//         seterror(false);
//         const response = await axios.get(url, {
//           signal: controller.signal,
//         });
//         console.log(response.data);
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           console.log("Reqest Cancelled ", error.message);
//           return;
//         }
//         seterror(true);
//         setLoading(false);
//       }
//     })();

//     return () => {
//       controller.abort();
//     };
//   }, deps);

//   return [products, loading, error];
// };

function App() {
  
  console.log("App");
  const [search, setSearch] = useState("");
  // const [products, loading, error] = useCustomReactQuery(
  //   `api/products?search=${search}`,
  //   [search]
  // );
  const [products, setProducts] = useState([]);
  const [error, seterror] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const id = setTimeout(() => {
      (async () => {
        try {
          // setLoading(true);
          // seterror(false);
          const response = await axios.get(`api/products?search=${search}`, {
            signal: controller.signal,
          });
          console.log(response.data);
          setProducts(response.data);
          // setLoading(false);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Reqest Cancelled ", error.message);
            return;
          }
          // seterror(true);
          // setLoading(false);
        }
      })();
    },400)
    return () => {
      controller.abort();
      clearInterval(id);
    };
  }, [search]);

  if (error) {
    return <h1>Something went wrong !</h1>;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>APIs in React</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <h2>Number of Products are {products.length}</h2>
    </>
  );
}

export default App;
