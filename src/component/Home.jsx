import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Helper/ProductCard';
import { ProductContext } from '../ProductContext';

function Home() {
  const context = useContext(ProductContext);
  const [productsData] = context.productApi.products.value || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const filteredProducts = productsData.filter(product => {
    return (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!minPrice || product.price >= parseFloat(minPrice)) &&
      (!maxPrice || product.price <= parseFloat(maxPrice))
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h5 className="display-5 text-light m-3 fw-semibold">Products</h5>
         
        </div>
      </div>
      <div className="row searchOptions d-flex lg:flex-row md:flex-row sm:flex-row justify-content-between mb-4 bg-primary p-3 rounded">
        <div className="col-xl-9 col-xxl-9 col-lg-8 col-md-7 col-sm-5 col-xs-2">
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              className='rounded p-1 border border-0 lg:w-100 md:w-100 search'
              onChange={e => setSearchQuery(e.target.value)}
            />
        </div>
        <div className="col-xl-3 col-xxl-3 col-lg-4 col-md-5 col-sm-7 d-flex flex-row gap-3">
          <div>
            <label htmlFor="filter" className='fw-bold'>Filter By Price:</label>
            <input
              type="number"
              placeholder="min"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className='w-25 mx-2 rounded p-1 border border-0 '
            />
            <input
              type="number"
              placeholder="max"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className='w-25 rounded p-1 border border-0'
            />
          </div>
        </div>
      </div>
      <div className="row">
        {filteredProducts.length === 0 ? (
          <div className="col-md-12">
            <div className="row text-center">
              <h5 className="text-secondary display-5 fw-semibold">No Products Found</h5>
            </div>
          </div>
        ) : (
          filteredProducts.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

