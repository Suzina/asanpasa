import '../../assets/css/order.css'
import {  useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { axiosPrivate } from '../../api/axios';
import Footer from '../Footer';
import useDashboardUI from '../../hooks/useDashboardUI';
import { Toaster, toast } from "react-hot-toast";

function OrderView() 
{
    useDashboardUI();
    const [order, setOrder] = useState([]);
    const { id } = useParams(); 
    const URL = `/orders/${id}`;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const getOrder = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get(URL, { signal });
            setOrder(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const renderStatusBadge = () => 
    {
        if (order.status === "Cancelled") 
        {
            return <span className="badge badge-danger">Cancelled</span>;
        } 
        else if (order.status === "Delivered") 
        {
            return <span className="badge badge-success">Delivered</span>;
        } 
        else 
        {
            return <span className="badge badge-primary">Pending</span>;
        }
    };
    const renderPaymentBadge = () => 
    {
        if (order.amt_due) 
        {
            return <span className="badge pending">Payment pending</span>;
        } 
        else 
        {
            return <span className="badge badge-success">Paid</span>;
        }
    };
    const changeStatus = async (id) => {

        
        console.log(newStatus);
        /*try 
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
        }*/
       console.log(id);
    }
    useEffect(() => 
    {
        const controller = new AbortController();
         if (id) 
        {
            getOrder(controller.signal);
        }
        return () => controller.abort();
    }, [id])

    return (
        <>
            <Sidebar/>
            <div className="ec-page-wrapper">
                <Header/>
                <div className="ec-content-wrapper">
                    <div className="content">
                        <div className="page">
                            <div className="topbar">
                                <div className="topbar-left">
                                    <h1>Order: {order.fullname}</h1>
                                    <span className="badges">
                                        {renderPaymentBadge()}
                                        {renderStatusBadge()}
                                    </span>
                                    <div className="subheading">
                                        {order.createdAt}
                                    </div>
                                </div>
                                <div className="topbar-right">
                                    <a className="btn" href="/admin/orders/add">
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                                        Edit
                                    </a>
                                    <button className="btn">
                                        <i className="mdi mdi-delete"></i>
                                        Delete
                                    </button>
                                </div>
                            </div>
                     </div>
                    <div className="grid">
                        <div className="col-main">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-header-left">
                                        <h2 className="card-title">Order Item</h2>
                                        <span className="badge unfulfilled">{order.status}</span>
                                    </div>
                                </div>
                                {order?.orderItems?.map((item) => (
                                    <div className="item-row" key={item.id}>
                                        <div className="item-thumb">
                                            <img src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" />
                                        </div>
                                        <div className="item-info">
                                            <div className="item-category">{item.product?.name}</div>
                                            <div className="item-name">{item.price}</div>
                                            <div className="item-variants">
                                            <span>Medium</span>
                                            </div>
                                        </div>
                                        <div className="item-price">{item.quantity} x {item.price}</div>
                                        <div className="item-total">Rs {item.quantity * item.price}</div>
                                        <svg className="trash-icon" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                                    </div>
                                ))}
                                <div className="promo-bar">
                                    <span className="promo-text">Effortlessly manage your orders with our intuitive Order List page.</span>
                                    <div className="promo-actions">
                                        <button className={`btn ${
                                                order.status === "Delivered"
                                                ? "btn-success"
                                                : order.status === "Cancelled"
                                                ? "btn-danger"
                                                : "btn-primary"
                                            }`}
                                            onClick={(e) => { e.preventDefault(); changeStatus(order.id); }}>
                                            {
                                                order.status === "Delivered"
                                                ? "Mark as pending"
                                                
                                                : "Mark as delivered"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <div className="card-header-left">
                                        <h2 className="card-title">Order Summary</h2>
                                        <span className="badge pending">Payment pending</span>
                                    </div>
                                </div>

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span style={{ textAlign: 'right' }}>
                                        <div>{order?.orderItems?.length} item</div>
                                    </span>
                                    <span>Rs.{order.total_amt}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Discount</span>
                                    <span>New customer</span>
                                    <span>-Rs.0.00</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>Free shipping (0.0 lb)</span>
                                    <span>Rs.100.00</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span></span>
                                    <span>Rs.{+(order.total_amt || 0) + 100}</span>
                                </div>
                                <hr className="summary-divider" />

                                <div className="paid-row">
                                    <div>
                                        <div className="paid-label">Paid by customer</div>
                                        <div className="paid-note">Amount Due</div>
                                    </div>
                                    <div className="advance">
                                        <span>Rs {order.advance}</span>
                                        <span className="badge badge-danger">Rs {order.amt_due}</span>
                                    </div>
                                </div>

                                <div className="promo-bar">
                                    <span className="promo-text">Review your order.</span>
                                    <div className="promo-actions">
                                        <button className="btn btn-primary">Collect payment</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-side">
                            <div className="card side-card">
                                <div className="card-header">
                                    <h2 className="card-title">Customers</h2>
                                </div>
                                <ul className="side-list">
                                    <li>
                                        <svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>
                                        {order.fullname}
                                    </li>
                                    <li>
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                                        {order.phonenumber}
                                    </li>
                                    <li>
                                        <svg className="icon" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                                        {order.address}
                                    </li>
                                    <li>
                                        <svg className="icon" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>
                                        1 Order
                                    </li>
                                </ul>
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

export default OrderView
