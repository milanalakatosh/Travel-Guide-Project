/* eslint-disable react/prop-types */
import React from 'react';
// import { useSelector } from 'react-redux';

export default function PersonalProductItem({ product, index }) {
  // const personalOrder = useSelector((state) => state.personalOrder);
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.excursion_name}</td>
      <td>{product.count}</td>
      <td>
        {product.totalPrice}
        {' '}
        руб.
      </td>
    </tr>
  // {index ===  personalOrder.length - 1
  // eslint-disable-next-line no-tabs
  // 	  ? (
  // <tr>
  //   <th>#</th>
  //   <th>Итого: </th>
  //   <th>
  //     ??
  //     {/* cart.reduce((acc, product) => acc + product.count, 0)} */}
  //   </th>
  //   <th>
  //     ??
  //     {' '}
  //     руб.
  //   </th>
  // </tr>
  // ): null}
  );
}
