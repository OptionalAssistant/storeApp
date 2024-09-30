"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Product } from "../types/types";

export default function ProductComponent({ product }: { product: Product }) {
  const [isPending, setPending] = useState(false);

  const payment = async () => {
    setPending(true);
    const response = await fetch("http://localhost:4444/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
      credentials: 'include', 
    });

    setPending(false);

    const parsedJson = await response.json();

    window.open(parsedJson.url, "_blank");
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`http://localhost:4444/uploads/${product.imageUrl}`}
        height={250}
        width={156}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}$</Card.Text>
        <Button variant="primary" onClick={payment} disabled={isPending}>
          Buy
        </Button>
      </Card.Body>
    </Card>
  );
}
