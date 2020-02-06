import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import Img from 'react-cool-img';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const amount = useSelector(state =>
        state.cart.reduce((sumAmount, product) => {
            sumAmount[product.id] = product.amount;
            return sumAmount;
        }, {})
    );

    // replacing componentDidMount
    useEffect(() => {
        // creating another function to be able to use async directive
        async function loadProducts() {
            const response = await api.get('products');
            console.log('response',response);
            const data = response.data.map(product => ({
                ...product,
                priceFormatted: formatPrice(product.price),
            }));
            // and instead of setState, we use setProducts now
            setProducts(data);
        }

        loadProducts();
    }, []);

    function handleAddProduct(id) {
        console.tron.log(id);
        // here using the bindActionCreators we can use the action directly from the props
        dispatch(CartActions.addToCartRequest(id));

        // after adding a product to cart, redux saga navigates to the /cart page. This happens
        // at the generator addToCart

        // const { dispatch } = this.props;
        // dispatch(CartActions.addToCart(product));
    }

    return (
        <ProductList>
            {products.map(product => (
                <li key={product.id}>
                    <Img src={product.image} alt={product.title} />
                    <strong>{product.title}</strong>
                    <span>{product.priceFormatted}</span>

                    <button
                        type="button"
                        onClick={() => handleAddProduct(product.id)}
                    >
                        <div>
                            <MdAddShoppingCart size={16} color="#FFF" />{' '}
                            {amount[product.id] || 0}
                            <span>Add to cart</span>
                        </div>
                    </button>
                </li>
            ))}
        </ProductList>
    );
}
