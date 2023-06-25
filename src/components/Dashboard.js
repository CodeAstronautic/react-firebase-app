import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../Header";

const URL = `https://api.instantwebtools.net/v1/passenger`;
export default function Dashboard() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
const size=10;
  const fetchData = async (pages) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${URL}?page=${page}&size=${size}`
      );
      const newData = response.data.data;
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!isLoading) {
        fetchData();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          {data.map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
            >
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="card-title">Name:</h5>
                    <p>{item.name}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5>Trips:</h5>
                    <p>{item.trips}</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
}
