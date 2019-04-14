import { Http } from './http-p'
class ProductModel extends Http {
  getProductList(page, shoesData) {
    return this.request({
      url: '/mina/product/list',
      method: 'GET',
      data: {
        page,
        shoesData
      }
    })
  }
  search(start, q) {
    q = q.toUpperCase()
    return this.request({
      url: '/mina/search',
      method: 'GET',
      data: {
        page: start,
        searchKey: q
      }
    })
  }
}

export default ProductModel
