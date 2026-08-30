import { useRef, useState, useEffect } from 'react';
import Sidebar from '../Layouts/Sidebar';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { Toaster, toast } from "react-hot-toast";
import { axiosPrivate } from '../../api/axios';
import useDashboardUI from '../../hooks/useDashboardUI';

const URL = '/orders';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Orders() 
{
    useDashboardUI();
    const userRef = useRef();
    const errRef = useRef();

    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');

        
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;
    const [isSearching, setIsSearching] = useState(false);

    const getOrders = async (page = 1, signal) => 
    {
        try 
        {
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
        
    }
    const searchOrders = async (page = 1) => 
    {
        console.log("Searching orders with query:", query, "and status:", status);
        try {
            const response = await axiosPrivate.get("orders/search", {
                params: { query, status, page, limit: itemsPerPage },
                withCredentials: true
            });

            setOrders(response.data.items);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
            setCurrentPage(response.data.currentPage);

        } catch (err) {
            toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');
            errRef.current.focus();
        }
    };

    const handleDeleteClick = async (id) => 
    {
        try 
        {
            await axiosPrivate.delete(`${URL}/${id}`, { withCredentials: true });
            setOrders(prev => prev.filter(orders => orders.id !== id));
            toast.success("Order deleted successfully");
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
        }
    }
    const goToPage = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        if (isSearching) {
            searchOrders(page);
        } else {
            getOrders(page);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query || status) {
                setIsSearching(true);
                searchOrders(1);
            } else {
                setIsSearching(false);
                getOrders(1);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query, status]);
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
                            <a className="btn" href={`${baseUrl}/admin/order/add`}>
                                <svg className="icon" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                                Add Order
                            </a>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12">
                        <div className="ec-cat-list card card-default">
                            <div className="search-card-body">
                                <div className="form-group row">
                                    <div className="col-8 col-md-3">
                                        <input name="query" className="form-control here slug-title" type="text" 
                                        id="query"
                                        autoComplete="off"
                                        onChange={(e) => setQuery(e.target.value)}
                                        value={query}
                                        />
                                    </div> 
                                    <div className="col-4 col-md-3">
                                        <select
                                            name="status"
                                            id="status"
                                            className="form-select"
                                            value={status} 
                                            onChange={(e) => setStatus(e.target.value)}

                                        >
                                            <option value="">Select a Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <p>{orders.length} result{orders.length !== 1 ? 's' : ''} for {query ? `query "${query}"` : status ? `status "${status}"` : 'all orders'}.</p>

                            </div>
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
                                                       {order.status === "Delivered" ? (
                                                        <span className="mb-2 mr-2 badge badge-success">
                                                            Delivered
                                                        </span>
                                                    ) : order.status === "Cancelled" ? (
                                                        <span className="mb-2 mr-2 badge badge-danger">
                                                            Cancelled
                                                        </span>
                                                    ) : (
                                                        <span className="mb-2 mr-2 badge pending">
                                                            {order.status}
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
                                                                <a className="dropdown-item" href={`${baseUrl}/admin/order/edit/${order.id}`}>Edit</a>
                                                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleDeleteClick(order.id); }}>Delete</a>															</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            
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
