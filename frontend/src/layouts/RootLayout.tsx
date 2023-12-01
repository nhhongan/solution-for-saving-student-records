import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import User from 'models/User';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './RootLayout.css'

const RootLayout: React.FC = () => {
  const [open_sidebar, setOpenSidebar] = useState(true);
  const [currentPage, setPage] = useState('');
  const new_user = {
    "id": "1",
    "name": "Benjamin"
  } as User
  // Add currentPage state
  const handleSidebarSelection = (page:string) => {
    setPage(page);
    setOpenSidebar(false);
    console.log(page);
  }
  return (
      <>
        <Navbar user={new_user} openSidebar={()=>setOpenSidebar(true)} currentPage={currentPage}/>
        <Sidebar 
          user={new_user} 
          open={open_sidebar}
          handleClose={()=>setOpenSidebar(false)}
          onSelection={(page)=>handleSidebarSelection(page)}/>
        <main className='root-layout'>
          <Outlet/>
        </main>
      </>
    );
};

export default RootLayout;
