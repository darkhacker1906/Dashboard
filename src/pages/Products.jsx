import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddProductsModal from "../components/AddProductsModal";
import ProductTable from "./ProductTable";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";

function Products() {
  const [productOpen, setProductOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const productClose = () => {
    setProductOpen(false);
  };

  const handleAddProducts = () => {
    setProductOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const data = querySnapshot.docs.map(doc => doc.data());
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
        Products Page
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 3 }}>
        <Button
          variant="contained"
          sx={{ background: "#65659D" }}
          onClick={handleAddProducts}
        >
          Add Products
        </Button>
      </Box>
      <AddProductsModal
        productOpen={productOpen}
        setProductOpen={setProductOpen}
        productClose={productClose}
      />
      <ProductTable />
    </Box>
  );
}

export default Products;
