import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0;
`;

export const Cart = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;

    /* if the opacity changes, it will take 0.2s to change */
    transition: opacity 0.2s;

    /* when hovering, opacity changes to 0.7 */
    &:hover {
        opacity: 0.7;
    }

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #3b3a3a;
        }

        span {
            font-size: 12px;
            color: #999;
        }
    }
`;
