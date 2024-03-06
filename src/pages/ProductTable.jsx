import { collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./productTable.css";
import DeleteModal from "../components/DeleteModal";
import { CircularProgress, Typography } from "@mui/material";
import EditModal from "../components/EditModal";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [loading,setLoading]=useState(false);
  const [deleteOpen,setDeleteOpen]=useState(false);
  const handleDeleteClose = () => setDeleteOpen(false);
  const[editOpen,setEditOpen]=useState(false);
  const handleEditClose=()=>{setEditOpen(false)};
  const [editData,setEditData]=useState({});
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        product: doc.data().product,
        model: doc.data().model,
        price: doc.data().price,
      }));
      setProducts(data);
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);

  const handleDelete = async (id) => {
    setId(id);
    setDeleteOpen(true);
  };
  const handleUpdate=async(data)=>{
    setEditData(data);
    setEditOpen(true);
  }
  return (
    <div>
      {
        loading ?<Typography sx={{textAlign:"center"}}><CircularProgress/></Typography> :  
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
                  
                  style={{ cursor: "pointer" }}
                />{" "}
                <FaEdit onClick={()=>handleUpdate(data)}
                 color="#65659D" fontSize={22} style={{ cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>  }
     
      <DeleteModal deleteOpen={deleteOpen}setDeleteOpen={setDeleteOpen}handleDeleteClose={handleDeleteClose} id={id} setProducts={setProducts}/>
      <EditModal editOpen={editOpen} setEditOpen={setEditOpen}handleEditClose={handleEditClose} editData={editData}/>
    </div>
  );
}

export default ProductTable;
