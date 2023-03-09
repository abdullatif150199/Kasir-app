import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3004/";

export default class Sukses extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    axios.get("http://localhost:3004/pesanans").then((res) => {
      this.setState({
        data: res.data,
      });
    });
  }
  render() {
    console.log(this.state.data);
    return (
      <div className="mt-4 text-center">
        <img src="assets/icons/sukses.png" width="250px" />
        <h2>Pesanan Sukses</h2>
        <p>terimaksih sudah memesan. pesanan anda sedang kami siapkan</p>
        <Link to="/">
          <button className="bg-primary text-white" style={{ border: "none", borderRadius: "5px" }}>
            kembali
          </button>
        </Link>
      </div>
    );
  }
}
