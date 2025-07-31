import { useState, useRef } from "react";
import { 
  Container, 
  Grid, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Typography,
  Paper,
  Box
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);
  const [selectedProduct, setSelectedProduct] = useState(products[0].code);

  const addItem = () => {
    let item = products.find((v) => selectedProduct === v.code)

    const newItem = {
      item: item.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      discount: discountRef.current.value || 0,
    };

    // Check for redundant items (same name and same price)
    const existingItemIndex = dataItems.findIndex((existingItem) => 
      existingItem.item === newItem.item && 
      parseFloat(existingItem.ppu) === parseFloat(newItem.ppu)
    );

    if (existingItemIndex !== -1) {
      // Merge with existing item: add quantities and discounts
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        qty: parseInt(updatedItems[existingItemIndex].qty) + parseInt(newItem.qty),
        discount: parseFloat(updatedItems[existingItemIndex].discount || 0) + parseFloat(newItem.discount || 0)
      };
      setDataItems(updatedItems);
    } else {
      // Add as new item (unique)
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const productChange = (event) => {
    let item = products.find((v) => event.target.value === v.code)
    setSelectedProduct(event.target.value);
    setPpu(item.price)
  }

  const clearItems = () => {
    setDataItems([]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Item</InputLabel>
                <Select
                  value={selectedProduct}
                  onChange={productChange}
                  label="Item"
                >
                  {products.map((p) => (
                    <MenuItem key={p.code} value={p.code}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Price Per Unit"
                type="number"
                inputRef={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(e.target.value)}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                inputRef={qtyRef}
                defaultValue={1}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Discount"
                type="number"
                inputRef={discountRef}
                defaultValue={0}
              />
            </Box>
            
            <Button 
              variant="contained" 
              fullWidth 
              onClick={addItem}
              sx={{ mt: 2 }}
            >
              Add
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearItems={clearItems}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
