const bag1 = require('../images/S-Cabas.png').default
const bag2 = require('../images/Rectangle10.png').default
const bag3 = require('../images/Rectangle11.png').default

const products = [
  {
    id:1,
    category : 'Tote Bags',
    name : 'S Cabas',
    price : 880000,
    img : bag1,
    slug : 's-cabas'
  },
  {
    id:2,
    category : 'Crossbody Bags',
    name : 'GG Marmont',
    price : 8800000,
    img : bag2,
    slug : 'gg-marmont'
  },
  {
    id:3,
    category : 'Backpacks',
    name : 'Lady Bag Backpack',
    price : 8800000,
    img : bag3,
    slug : 'lady-bag-backpacks'
  },
  {
    id:4,
    category : 'Backpacks',
    name : 'Lady Backpack',
    price : 8800000,
    img : bag3,
    slug : 'lady-backpacks'
  }
]

const getAllProduct = () => products;

const getProducts = (count) => {
  const max = products.length - count
  const min = 0
  const start = Math.floor(Math.random() * (max - min) + min)
  return products.slice(start, start + count)
}

const productData = {
  getAllProduct,
  getProducts
}

export default productData