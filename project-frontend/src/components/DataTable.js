import React from 'react';
import DataTableHeader from './DataTableHeader';
import DataTableRow from './DataTableRow';

export default function DataTable({ currentTable }) {
  return (
    <div>
      <p>Displayed here is all table data for {currentTable[0].tableName}</p>
      <table id="data">
        <thead>
          <DataTableHeader />
          {/* {table.map((category, i) => <DataTableHeader category={category} key={i} />)} */}
        </thead>
        <tbody>
          <DataTableRow />
          {/*{table.map((data, i) => <DataTableRow data={data} key={i} />)}*/}
        </tbody>
      </table>
    </div>
  );
}
