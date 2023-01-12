import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full fixed bottom-0 h-16 border-t-2 border-t-gray-200 p-2 flex justify-between items-center">
      <Link to="/"><HomeOutlinedIcon fontSize="large" /></Link>
      <Link to="/add-post"><AddIcon fontSize="large" /></Link>
      <Link to="/profile"><PersonOutlineOutlinedIcon fontSize="large" /></Link>
    </div>
  )
}

export default Navbar
