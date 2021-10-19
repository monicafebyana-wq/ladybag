import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import ProductText from '../components/ProductText';
import Helmet from '../components/Helmet';
import Recommend from '../components/Recommend';
import ProductCarousel from '../components/ProductCarousel2';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const DetailProduct = (props) => {
  const location = useLocation()
  const fromCatalog = location.state?.id
  const idUser = location.state?.idUser

  const [detail, setDetail] = useState(null);
  const [recommend, setRecommend] = useState(null);

  const url =`${process.env.REACT_APP_API_URL}products/${fromCatalog}`

  useEffect(() => {
    axios.get(url).then((response) => {
      setDetail(response.data);
    });
  }, []);

  const url2 =`${process.env.REACT_APP_API_URL}categories/`

  useEffect(() => {
    axios.get(url2).then((response) => {
      setRecommend(response.data);
    });
  }, []);

  if (!detail || !recommend) return (
    <div className="loading">
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  );

  return (
    <Helmet title={detail.name}>
      <ProductCarousel 
      {...detail}
      idUser={idUser} />
      <ProductText {...detail}/>
      <div className="hr" />
      {
        recommend.map((item, i ) => (
          item.id === detail.category_id ?
          <Recommend 
            key={i}
            {...item}
            idUser={idUser}
            /> : ''
        ))
      }
      </Helmet>
  )
}

export default DetailProduct
