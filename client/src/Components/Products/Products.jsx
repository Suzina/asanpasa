import useDashboardUI from '../../hooks/useDashboardUI';
import { useRef, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import { Toaster, toast } from "react-hot-toast";
import { axiosPrivate } from '../../api/axios';
const URL = '/products';

function Products() 
{
    useDashboardUI(); 
    
    const userRef = useRef();
    const errRef = useRef();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [editingId, setEditingId] = useState(null);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState('');

    const getProducts = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get(URL, { signal });
            setProducts(response.data);
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
    const getCats = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get('/categories', { signal });
            setCategories(response.data);
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
                response = await axiosPrivate.put(`${URL}/${editingId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
                 });
    
                if (response.data.error) 
                {
                    toast.error(response.data.error)
                } 
                else 
                {
                    toast.success("Product Updated!");
                    setProducts(prev =>
                        prev.map(prod =>
                            prod.id === editingId ? { ...prod, ...response.data } : prod
                        )
                    );
                    resetForm();
                }

            }
            else
            {
                response = await axiosPrivate.post(URL,
                JSON.stringify({ name,price,image,category_id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );
                
                if (response.data.error) 
                {
                    toast.error(response.data.error);
                    console.log(response.data).error;

                } 
                else 
                {
                    
                    toast.success("New Product Added!");
                    console.log(response.data);
                    setProducts(prev => [ response.data,...prev]); 
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
                toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');
            } else if (err.response?.status === 401) {
                toast.error('Unauthorized');
            } else {
                toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');

            }
            errRef.current.focus();
        }
    }

    const handleEditClick = (editprod) => 
    {
        setName(editprod.name);
        setPrice(editprod.price);
        setCat(editprod.category_id);
        setEditingId(editprod.id);
        userRef.current?.focus();
    }

    const handleDeleteClick = async (id) => 
    {
        try 
        {
            await axiosPrivate.delete(`${URL}/${id}`, { withCredentials: true });
            setCat(prev => prev.filter(cat => cat.id !== id));
            if (editingId === id) resetForm();
            toast.success("Category deleted successfully")
        } 
        catch (err) 
        {
            console.log(err)
    
            if (!err?.response) 
            {
                toast.error('No Server Response');
            }
            else 
            {
                toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');
            }
            errRef.current.focus();
        }
    }
    useEffect(() => 
    {
        const controller = new AbortController();
        getProducts();
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
                    <h1>Products</h1>
                    <Toaster
                    position="top-right"
                    reverseOrder={false}
                    />
                    <p className="breadcrumbs"><span><a href={`${baseUrl}/dashboard`}>Home</a></span>
                    <span><i className="mdi mdi-chevron-right"></i></span>Products</p>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-lg-12">
                        <div className="ec-cat-list card card-default mb-24px">
                            <div className="card-body">
                                <div className="ec-cat-form">
                                        <h4>{editingId !== null ? "Edit Product" : "Add New Product"}</h4>
                                        
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
                                                    placeholder="Enter product name" required
                                                    />
                                                </div>
                                                <label htmlFor="text" className="col-12 col-form-label">Image</label> 
                                                <div className="thumb-upload-set colo-md-12">
                                                    <div className="thumb-upload">
                                                        <div className="thumb-edit">
<input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
/>                                                        </div>
                                                       
                                                    </div>
												</div>
                                                
                                                <label htmlFor="text" className="col-12 col-form-label">Price</label> 
                                                <div className="col-12">
                                                    <input name="price" className="form-control here slug-title" type="text" 
                                                    id="price"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    value={price}
                                                    placeholder="Enter product price" required
                                                    />
                                                </div>
                                                <label htmlFor="text" className="col-12 col-form-label">Category</label> 
                                                <div className="col-12">
<select
    name="category_id"
    id="Categories"
    className="form-select"
    value={category_id}  // must be a number/string, e.g. 3, not { id: 3, name: "Electronics" }
    onChange={(e) => setCategoryId(e.target.value)}
>
    <option value="">Select a category</option>
    {categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
    ))}
</select>
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
                                                    <th>Price</th>
                                                    <th>Category</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {products.map((product) => (
                                                    <tr key={product.id}>
                                                        <td><img className="cat-thumb" src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg" alt="{category.name}" /></td>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.category.name}</td>
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
                                                                <a className="dropdown-item" href={`${baseUrl}/admin/product/${product.id}`}>View</a>
																<a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleEditClick(product); }}>Edit</a>
                                                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleDeleteClick(product.id); }}>Delete</a>															</div>
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

export default Products
