import { Col, Row } from "react-bootstrap";
import { Product } from "../types/types";
import ProductComponent from "./Product";



export default function  ProductList({products} : {products: Product[]}){
    return(
     <>
     <Row xs={1} sm={2} md={3} xl={4} className="g-4">
        {products.map((product) =>(
            <Col key={product.id}>
                <ProductComponent product={product}/>
            </Col>
        ))}
     </Row>
     </>
    );
}