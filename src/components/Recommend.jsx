import React from 'react'
import ProductsCard from '../components/ProductsCard'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

const Recommend = props => {
  return (
    <div className="recommend">
      <div className="recommend-title">
        You May Also Like
      </div>
      <div className="recommend-body">
        <Grid container spacing={3}>
          {
            props.product.slice(0, 4).map((item, i) => (
              <Grid item xs={12} md={3} key={i}>
                <ProductsCard
                  key={i}
                  {...item}
                  idUser={props.idUser}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
      <div className="recommend-footer">
        <Link to='/catalog'>
          SEE MORE &gt;
        </Link>
      </div>
    </div>
  )
}

Recommend.propTypes = {

}

export default Recommend
