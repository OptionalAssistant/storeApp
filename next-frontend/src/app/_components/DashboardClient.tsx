"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useForm } from "react-hook-form";
import { Product } from "../types/types";

type ProductForm = Omit<Product, 'id'>;

function DashboardClient(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>();

  const [posterUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImageUrl(imageUrl);
      setFile(selectedFile);
    }
  };

  const onSubmit = (data: ProductForm) => {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('imageUrl', 'lalka');

    fetch('http://localhost:4444/products/create', {
      method: 'POST',
      body: formData,  
      credentials: 'include',  
    })

    router.push('/');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="Enter title..."
          {...register("name", {
            required: "Name is required",
          })}
        />
        {<span>{errors.name?.message}</span>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter price..."
          {...register("price", {
            required: "Price is required",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Please enter a valid price (up to 2 decimal places)",
            },
          })}
        />
        {errors.price && <span>{errors.price.message}</span>}
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Poster</Form.Label>
        <Form.Control type="file" name="file" onChange={handleChangeFile} />
      </Form.Group>
      {posterUrl && (
        <img
          src={posterUrl}
          alt="Avatar preview"
          style={{ width: "240px", height: "300px", display: "block", marginBottom: "10px" }}
        />
      )}
      <Button
        variant="dark button-outline btn btn-primary btn-md"
        type="submit"
        className="mb-4"
      >
        Submit
      </Button>
    </Form>
  );
}

export default DashboardClient;