// src/components/layout/MainLayout.tsx

import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { Box } from '@mui/material';


const MainLayout = () => {
  return (
    <Box flex="1" display="flex" height="100vh">
      <Sidebar />
      <Box flex="1" p="6">
        <Outlet /> {/* Your page components will render here */}
      </Box>
    </Box>
  );
};

export default MainLayout;