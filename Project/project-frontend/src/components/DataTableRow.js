import React from 'react';
import { Link } from 'react-router-dom';

export default function DataTableRow({ data }) {

  function editItem() {
    alert('You have edited an item!');
  }
  function deleteItem() {
    alert('You have deleted an item!');
  }

  return (
    <tr>
      <td>Data</td>
      <td className="edit"><Link onClick={() => editItem()}>Edit</Link></td>
      <td className="delete"><Link onClick={() => deleteItem()}>Delete</Link></td>
    </tr>
  );
}
