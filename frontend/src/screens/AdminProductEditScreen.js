import React, { useState, useEffect } from "react";

/* AXIOS */
import axios from "axios";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Form, Row, Col, Container } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listProductDetails, updateProduct } from "../actions/productActions";

/* ACTION TYPES */
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function AdminProductEditScreen({ match, history }) {
  /* GETTING USER ID FROM URL */
  const productId = match.params.id;

  /* STATE */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [default_price, setDefaultPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    // CHECK IF PRODUCT WAS UDPATED
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setDefaultPrice(product.default_price);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    // DISPATCH TO UPDATE PRODUCT
    dispatch(
      updateProduct({
        _id: productId,
        name,
        default_price,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div className="m-5 p-5 ">
      <Container>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="bg-light " style={{ borderRadius: "2rem" }}>
            <h1 className="text-center m-3">Edit Product</h1>
            <div className="m-2">
              <Row>
                <Col>
                  <span className="text-center">
                    <img
                      variant="center"
                      src={image}
                      alt={image.name}
                      className="w-100"
                    />
                  </span>
                </Col>
                <Col className="m-3 p-2">
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="price">
                      <Form.Label>Default Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Default Price"
                        value={default_price}
                        onChange={(e) => setDefaultPrice(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="image">
                      <Form.Label>Image</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter Image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />

                      <Form.File
                        id="image-file"
                        label="Choose File"
                        custom
                        onChange={uploadFileHandler}
                      />

                      {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId="brand">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="countinstock">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Stock"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ height: "20vh" }}
                      />
                    </Form.Group>
                    <div className="text-center">
                      <Link to="/admin/productlist">
                        <Button variant="dark" className="m-3">
                          Go Back
                        </Button>
                      </Link>
                      <Button type="submit" variant="danger" className="m-3">
                        Update
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AdminProductEditScreen;
