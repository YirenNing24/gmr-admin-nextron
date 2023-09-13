// ** MUI Imports
import { useState, useEffect } from 'react';
import { DataGrid, GridSortModel } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

// ** API Imports
import { getDocuments } from '../../../renderer/server/search';

const VISIBLE_FIELDS = ['username', 'email', 'lastOnline', 'status', 'createdAt'];

const columnLabelMap = {
  username: 'USERNAME',
  email: 'EMAIL',
  lastOnline: 'LAST ONLINE',
  status: 'STATUS',
  createdAt: 'CREATED AT',
};

const TablePlayers = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Initialize data state

  const [sortModel, setSortModel] = useState([
    {
      field: 'rating',
      sort: 'desc',
    },
  ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allContracts = await getDocuments('playersAdmin');

        // Map the fetched data to match the visible fields
        const mappedData = allContracts.map((item) => ({
          username: item.username,
          email: item.email,
          lastOnline: item.lastOnline,
          status: item.status,
          createdAt: item.createdAt,
        }));

        setData(mappedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return null; // Return loading indicator or message here
  }

  return (

      <DataGrid sx={{}}
        rows={data} // Use the mapped data as rows
        columns={VISIBLE_FIELDS.map((field) => ({
          field,
          headerName: columnLabelMap[field],
          flex: 1,
          
        }))}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        getRowId={(row) => row.username} // Use username as the unique id
      />

  );
};

export default TablePlayers;