import axios from "axios";
import React, { useEffect, useState } from "react";

const baseURL = "http://localhost:3000/";

const useFetch = (url) => {
  const [data, setData] = useState<ProductDetail | undefined>(undefined);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${baseURL}${url}`);
        setData(response.data);
      } catch (error) {
        console.log("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  return { data, loading };
};
