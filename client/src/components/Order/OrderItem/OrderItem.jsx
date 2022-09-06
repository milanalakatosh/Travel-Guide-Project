/* eslint-disable react/prop-types */
import React from 'react';

export default function OrderItem({
  product, index,
}) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>{product.count}</td>
      <td>
        {product.priceTotal}
        {' '}
        руб.
      </td>
    </tr>
  );
}
