import React, { useEffect , useState } from 'react';
import Sidebar from '../Navigationbars/Sidebar';
import TopNav from '../Navigationbars/TopNav';
import './Category.css';
import CategoryModal from './CategoryModal';
import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Category = ({ userId , loggedIn }) => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/category?userId=${userId}`);
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

    useEffect(() => {
        fetchCategories();
      });

    useEffect(() => {
        if (!loggedIn) {
          navigate('/signin', { replace: true });
        }
      }, [loggedIn, navigate]);
    
      if (!loggedIn) {
        return null;
      }

      
    return (
        <div className="main-container d-flex">
            <Sidebar activePage="category" />
            <div className="content main-content ">
                <TopNav userId = {userId}/>
                <div className="container-fluid p-2 categories ">
                    <div className="container-fluid category-header d-flex justify-content-between py-2">
                        <h1>Categories</h1>
                        <div className="input-group d-flex justify-content-end align-items-center">
                            <button className="add-expense-btn" id="" data-toggle="modal" data-target="#category-modal">Add Category</button>
                        </div>
                    </div>
                    <div className='categories-list'>
                        <div className="container-fluid  row d-flex m-0 g-3">
                            {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />))}
                        </div>
                    </div>
                    
                </div>
                <CategoryModal userId = {userId} fetchCategories={fetchCategories}/>
            </div>
        </div>
    );
} 

export default Category;