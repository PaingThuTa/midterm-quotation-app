import React from "react";
import { 
  Container, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import { ShoppingCart, Clear, Delete } from "@mui/icons-material";

import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex, clearItems }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Quotation
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingCart />
          <Typography>No items</Typography>
        </Box>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => {
    const amount = (v.qty * v.ppu) - (v.discount || 0);
    return acc + amount;
  }, 0);

  const totalDiscount = data.reduce((acc, v) => {
    return acc + (parseFloat(v.discount) || 0);
  }, 0);

  const handleDelete = (index) => {
    deleteByIndex(index);
  }

  const handleClear = () => {
    clearItems();
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Quotation
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<Clear />}
          onClick={handleClear}
          color="secondary"
        >
          Clear
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              let amount = (v.qty * v.ppu) - (v.discount || 0);
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <IconButton 
                      onClick={() => handleDelete(i)}
                      color="error"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">{v.discount || 0}</TableCell>
                  <TableCell align="right">{amount}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography variant="h6">Total Discount</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{totalDiscount}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography variant="h6">Total Amount</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{total}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;
