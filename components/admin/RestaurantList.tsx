import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import DataGrid from 'react-data-grid';

interface Row {
  id: number;
  name: string;
}

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' },
];

const RestaurantList = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return <DataGrid columns={columns} rows={rows}></DataGrid>;
};

export default RestaurantList;
