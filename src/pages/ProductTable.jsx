import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./productTable.css";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          product: doc.data().product,
          model: doc.data().model,
          price: doc.data().price,
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async (id) => {
    const userDoc = doc(db, "products", id);
    await deleteDoc(userDoc);
    setId(id);
  };
  const handleUpdate=async(data)=>{
  //  const userDoc=(da)
  }
  return (
    <div>
      <table>
        <thead style={{ background: "#65659D" }}>
          <tr>
            <th>Product</th>
            <th>Model</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((data) => (
            <tr key={data.id}>
              <td>{data.product}</td>
              <td>{data.model}</td>
              <td>{data.price}</td>
              <td style={{ display: "flex", gap: 4 }}>
                <MdDelete
                  color="red"
                  fontSize={22}
                  onClick={() => handleDelete(data.id)}
                />{" "}
                <FaEdit onClick={()=>handleUpdate(data)}
                 color="#65659D" fontSize={22} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
