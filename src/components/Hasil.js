import React, { Component } from "react";
import { Col, Row, ListGroup, Badge } from "react-bootstrap";
import numberWithCommas from "../utils/utils";
import TotalBayar from "./TotalBayar";
import swal from "sweetalert";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";

const API_URL = "http://localhost:3004/";

export default class Hasil extends Component {
  state = {
    showModal: false,
    keranjangDetail: false,
    jumlah: 0,
    keterangan: "",
    totalHarga: 0,
  };

  refreshKeranjangs = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        this.setState({
          keranjangs: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjang,
      jumlah: keranjang.jumlah,
      keterangan: keranjang.keterangan,
      totalHarga: keranjang.totalHarga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handlePlus = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  handleMinus = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  handleChange = (e) => {
    this.setState(
      {
        keterangan: e.target.value,
      },
      () => console.log(this.state.keterangan)
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      totalHarga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios.put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data).then((res) => {
      swal({
        title: "Sukses!",
        text: `sukses update pesanan ${data.product.nama}`,
        icon: "success",
        button: false,
        timer: 1000,
      });
      this.props.refreshKeranjangs();
    });
  };

  handleDelete = (id) => {
    axios.delete(API_URL + "keranjangs/" + id).then((res) => {
      this.handleClose();
      this.props.refreshKeranjangs();
      swal({
        title: "Hapus Pesanan!",
        text: `sukses hapus pesanan ${this.state.keranjangDetail.product.nama}`,
        icon: "error",
        button: false,
        timer: 1000,
      });
    });
  };

  render() {
    const keranjangs = this.props.keranjangs;
    return (
      <Col md={3} className="text-center hasil">
        <p>
          <strong>Hasil</strong>
        </p>
        <hr />
        {keranjangs.length > 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((keranjang, index) => {
              return (
                <Row key={index}>
                  <Col md={2} sm={2} xs={2}>
                    <h5>
                      <Badge bg="success">{keranjang.jumlah}</Badge>
                    </h5>
                  </Col>
                  <Col md={6} sm={6} xs={6}>
                    <ListGroup.Item
                      style={{ border: "none" }}
                      onClick={() => {
                        this.handleShow(keranjang);
                      }}
                    >
                      <p>
                        <b>{keranjang.product.nama}</b>
                      </p>
                      <p>Rp.{numberWithCommas(keranjang.product.harga)}</p>
                    </ListGroup.Item>
                  </Col>
                  <Col md={4} sm={4} xs={4}>
                    <p>
                      <b>Rp.{numberWithCommas(keranjang.totalHarga)}</b>
                    </p>
                  </Col>
                </Row>
              );
            })}
          </ListGroup>
        )}
        <ModalKeranjang handleClose={this.handleClose} {...this.state} handlePlus={this.handlePlus} handleMinus={this.handleMinus} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} />
        {keranjangs.length > 0 && <TotalBayar keranjangs={keranjangs} {...this.props} />}
      </Col>
    );
  }
}
