import { useRef, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import { Toaster, toast } from "react-hot-toast";
import { axiosPrivate } from '../../api/axios';
import useDashboardUI from '../../hooks/useDashboardUI';

const URL = '/orders';

function Orders() 
{
    useDashboardUI();
    const userRef = useRef();
    const errRef = useRef();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [editingId, setEditingId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState('');

        
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(false);

    const getOrders = async (page = 1, signal) => 
    {
        try 
        {
            setLoading(true);
            const response = await axiosPrivate.get(URL, {
                params: { page, limit: itemsPerPage },
                signal,
            });
            setOrders(response.data.items);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
            setCurrentPage(response.data.currentPage);
        } 
        catch (err) 
        {
            console.log(err);
        }
        finally
        {
            setLoading(false);
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
     const goToPage = (page) => 
    {
        if (page < 1 || page > totalPages || page === currentPage) return;
        getOrders(page);
    }
    useEffect(() => 
    {
        const controller = new AbortController();
        getOrders();
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
                    <h1>Orders</h1>
                    <Toaster
                    position="top-right"
                    reverseOrder={false}
                    />
                    <p className="breadcrumbs"><span><a href={`${baseUrl}/dashboard`}>Home</a></span>
                    <span><i className="mdi mdi-chevron-right"></i></span>Orders</p>
                </div>
                <div className="row">
                    <div className="page">
                        <div className="topbar-right">
                            <a className="btn" href="/admin/order/add">
                                <svg className="icon" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                                Add Order
                            </a>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                        <div className="ec-cat-list card card-default mb-30">
                            <div className="card-body">
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
                        <div className="ec-cat-list card card-default">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="responsive-data-table" className="table" style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Fullname</th>
                                                <th>Address</th>
                                                <th>Phone Number</th>
                                                <th>Total Amt</th>
                                                <th>Advance</th>
                                                <th>Amt Due</th>
                                                <th>User</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {orders.map((order,index) => (
                                                <tr key={order.id}>
                                                    <td>{index + 1}</td>
                                                    <td><a href={`${baseUrl}/admin/order/${order.id}`}>{order.fullname}</a></td>
                                                    <td>{order.address}</td>
                                                    <td>{order.phonenumber}</td>
                                                    <td>{order.total_amt}</td>
                                                    <td>{order.advance}</td>
                                                    <td>{order.amt_due}</td>
                                                    <td>{order.user.username}</td>
                                                    <td>
                                                        {order.amt_due == 0 ? (
                                                            <span className="mb-2 mr-2 badge badge-success">
                                                                Paid
                                                            </span>
                                                        ) : (
                                                            <span className="mb-2 mr-2 badge badge-danger">
                                                                Due: {order.amt_due}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button type="button"
                                                                className="btn btn-outline-success">View
                                                            </button>
                                                            <button type="button"
                                                                className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                                                                data-bs-toggle="dropdown" aria-haspopup="true"
                                                                aria-expanded="false" data-display="static">
                                                                <span className="sr-only">Info</span>
                                                            </button>

                                                            <div className="dropdown-menu">
                                                                <a className="dropdown-item" href={`${baseUrl}/admin/order/${order.id}`}>View</a>
                                                                <a className="dropdown-item" href={`${baseUrl}/admin/order/${order.id}`}>Edit</a>
                                                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleDeleteClick(order.id); }}>Delete</a>															</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            
                                {/* ===== Pagination controls ===== */}
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span>
                                            Showing page {currentPage} of {totalPages} ({totalItems} total orders)
                                        </span>
                                        <nav>
                                            <ul className="pagination mb-0">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => goToPage(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Prev
                                                    </button>
                                                </li>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                    <li
                                                        key={page}
                                                        className={`page-item ${page === currentPage ? 'active' : ''}`}
                                                    >
                                                        <button className="page-link" onClick={() => goToPage(page)}>
                                                            {page}
                                                        </button>
                                                    </li>
                                                ))}

                                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => goToPage(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                )}
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
 
export default Orders
