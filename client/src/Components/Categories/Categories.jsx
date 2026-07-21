import { useRef, useState, useEffect, useContext } from 'react';
import { Toaster, toast } from "react-hot-toast";
import Sidebar from '../Sidebar';
import Header from '../Header';
import { axiosPrivate } from '../../api/axios';
import Footer from '../Footer';
const URL = '/categories';

function Categories() {

    const userRef = useRef();
    const errRef = useRef();
    const [name, setName] = useState('');
    const [categories, setCat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const getCats = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get(URL, { signal });
            setCat(response.data);
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
    const resetForm = () => 
    {
        setName('');
        setEditingId(null);
    }
    const handleSubmit= async (e) =>
    {
        e.preventDefault();
        try
        {
            let response;
            if (editingId !== null) 
            {
                response = await axiosPrivate.put(`${URL}/${editingId}`,
                    JSON.stringify({ name }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
 
                if (response.data.error) 
                {
                    toast.success(response.data.error)
                } else {
                    toast.success("Category Updated!");
                    setCat(prev =>
                        prev.map(cat =>
                            cat.id === editingId ? { ...cat, ...response.data } : cat
                        )
                    );
                    resetForm();
                }

            }
            else
            {
                response = await axiosPrivate.post(URL,
                JSON.stringify({ name }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );
                
                if (response.data.error) 
                {
                    toast.error(response.data.error);
                } 
                else 
                {
                    
                    toast.success("New Category Added!");
                    setCat(prev => [ response.data,...prev]); 
                    resetForm();
                }
            }
            
            
        }
        catch (err)
        {
            console.log(err)
    
            if (!err?.response) 
            {
                toast.error('No Server Response');
            } else if (err.response?.status === 400) {
                toast.error('Missing Name');
            } else if (err.response?.status === 401) {
                toast.error('Unauthorized');
            } else {
                toast.error('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleEditClick = (category) => {
        setName(category.name);
        setEditingId(category.id);
        userRef.current?.focus();
    }

    const handleDeleteClick = async (id) => {
        try 
        {
            await axiosPrivate.delete(`${URL}/${id}`, { withCredentials: true });
            setCat(prev => prev.filter(cat => cat.id !== id));
            if (editingId === id) resetForm();
            toast.success("Category deleted successfully")
        } 
        catch (err) {
            console.log(err);
            setErrMsg('Could not delete category');
            toast.success("Failed to delete category")
        }
    }

    useEffect(() => 
    {
        const controller = new AbortController();
        getCats();
        return () => controller.abort();
    }, [])
  return (
    <>
    <Sidebar/>
    <div className="ec-page-wrapper">
      <Header/>
		<div className="ec-content-wrapper">
            <div className="content">
                <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
                    <h1>Categories</h1>
                    <Toaster
                    position="top-right"
                    reverseOrder={false}
                    />
                    <p className="breadcrumbs"><span><a href={`${baseUrl}/dashboard`}>Home</a></span>
                    <span><i className="mdi mdi-chevron-right"></i></span>Categories</p>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-lg-12">
                        <div className="ec-cat-list card card-default mb-24px">
                            <div className="card-body">
                                <div className="ec-cat-form">
                                        <h4>{editingId !== null ? "Edit Category" : "Add New Category"}</h4>
                                        
                                        <form id="catForm" onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="text" className="col-12 col-form-label">Name</label> 
                                                <div className="col-12">
                                                    <input name="name" className="form-control here slug-title" type="text" 
                                                    id="name"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    placeholder="Enter category name" required
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <button name="submit" type="submit" className="btn btn-primary">
                                                        {editingId !== null ? "Update" : "Submit"}
                                                    </button>
                                                    {editingId !== null && (
                                                        <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-12">
                            <div className="ec-cat-list card card-default">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table id="responsive-data-table" className="table">
                                            <thead>
                                                <tr>
                                                    <th>Thumb</th>
                                                    <th>Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {categories.map((category) => (
                                                    <tr key={category.id}>
                                                        <td><img className="cat-thumb" src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg" alt="{category.name}" /></td>
                                                        <td>{category.name}</td>
                                                        <td>
														<div className="btn-group">
															<button type="button"
																className="btn btn-outline-success">View</button>
															<button type="button"
																className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
																data-bs-toggle="dropdown" aria-haspopup="true"
																aria-expanded="false" data-display="static">
																<span className="sr-only">Info</span>
															</button>

															<div className="dropdown-menu">
                                                                <a className="dropdown-item" href={`${baseUrl}/admin/category/${category.id}`}>View</a>
																<a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleEditClick(category); }}>Edit</a>
                                                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleDeleteClick(category.id); }}>Delete</a>															</div>
														</div>
													</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div> 
        </div> 
                <Footer />

        </div>
    </>
  )
}

export default Categories
