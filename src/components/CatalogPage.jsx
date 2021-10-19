import React, { Component } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import ProductsCard from '../components/ProductsCard'
import Grid from '@material-ui/core/Grid'

export default class CatalogPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      offset : 0,
      data : [],
      perPage : 9,
      currentPage : 0
    }

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  receivedData() {
    axios
      .get(`${process.env.REACT_APP_API_URL}products`)
      .then(res => {
        const data = res.data;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map((item, i) => 
          <Grid item xs={12} key={i} sm={4}>
            <ProductsCard
            key={i}
            {...item}
            idUser={this.props.idUser}
            />
          </Grid>)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            postData
        })
      });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    });
  };

  componentDidMount() {
    this.receivedData()
  }

  render() {
    return (
      <div>
        <Grid container spacing={1}>
          {this.state.postData}
        </Grid>
          <ReactPaginate
            previousLabel={"PREV"}
            nextLabel={"NEXT"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/>
      </div>
    )
  }
}
