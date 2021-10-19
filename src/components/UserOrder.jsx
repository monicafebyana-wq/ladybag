import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import { formatDate } from '../assets/utils/utils';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const UserOrder = (props) => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);

  const url =`${process.env.REACT_APP_API_URL}payments`
  const url2 =`${process.env.REACT_APP_API_URL}statuses`

  useEffect(() => {
    axios.get(url).then((response) => {
      setOrder(response.data);
    });
    axios.get(url2).then((response) => {
      setStatus(response.data);
    });
  }, []);

  if (!order || !status ) return (
    <div className="loading">
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  );

  return (
    <div className="userOrder">
      <div className="userOrder-title">Your Order</div>
      <table className="userOrder-body">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Check</th>
          </tr>
        </thead>
        {
          order.map((item, i) => (
            item.user_id === props.userId ?
            <tbody key={i}>
              <tr>
                <td>#{item.id}</td>
                <td>{formatDate(item.created_at)}</td>
                <td>
                  {
                    status.map((status) => (
                      item.status_id === status.id ? 
                      status.status 
                      : 
                      ''
                    ))
                  }
                </td>
                <td>Rp. {item.total.toLocaleString()}</td>
                <td>
                  <Link to={{ pathname: `/user/order/${item.id}` }}>
                    <button className="logres-card-form-submit">
                      Check
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
            :
            ''
          ))
        }
      </table>
    </div>
  )
}

export default UserOrder
