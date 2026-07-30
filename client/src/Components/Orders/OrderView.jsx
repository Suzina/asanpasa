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
                    
                    <div className="page">
                        <div className="topbar">
                            <div className="topbar-left">
                            <h1>Order ID: {order.id}</h1>
                            <span className="badges">
                                <span className="badge pending">Payment pending</span>
                                <span className="badge unfulfilled">Unfulfilled</span>
                            </span>
                            <div className="subheading">January 8, 2024 at 9:48 pm from Draft Orders</div>
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
                                        <span className="badge unfulfilled">Unfulfilled</span>
                                    </div>
                                    <svg className="chevron" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                                </div>
                                <div className="item-row">
                                    <div className="item-thumb">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#5c53e0" strokeWidth="1.5">
                                        <rect x="3" y="4" width="18" height="12" rx="1.5"/>
                                        <path d="M2 19h20"/>
                                        <path d="M9 19l1-3h4l1 3"/>
                                        </svg>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-category">Laptop</div>
                                        <div className="item-name">Macbook Air</div>
                                        <div className="item-variants">
                                        <span>Medium</span>
                                        <span>·</span>
                                        <span>Black</span>
                                        <span className="swatch"></span>
                                        </div>
                                    </div>
                                    <div className="item-price">3 x $500.00</div>
                                    <div className="item-total">$1,500.00</div>
                                    <svg className="trash-icon" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                                </div>

                                <div className="promo-bar">
                                    <span className="promo-text">Effortlessly manage your orders with our intuitive Order List page.</span>
                                    <div className="promo-actions">
                                        <button className="btn">Fulfill item</button>
                                        <button className="btn btn-primary">Create shipping label</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <div className="card-header-left">
                                        <h2 className="card-title">Order Summary</h2>
                                        <span className="badge pending">Payment pending</span>
                                    </div>
                                    <svg className="chevron" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                                </div>
                                <p className="helper-text">Use this personalized guide to get your store up and running.</p>

                                <div className="summary-row">
                                <span>Subtotal</span>
                                <span style={{ textAlign: 'right' }}>
                                    <div>1 item</div>
                                </span>
                                <span>$1,500</span>
                                </div>
                                <div className="summary-row">
                                <span>Discount</span>
                                <span>New customer</span>
                                <span>-$1.00</span>
                                </div>
                                <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free shipping (0.0 lb)</span>
                                <span>$0.00</span>
                                </div>
                                <div className="summary-row total">
                                <span>Total</span>
                                <span></span>
                                <span>$1,499</span>
                                </div>

                                 <hr className="summary-divider" />

                                <div className="paid-row">
                                    <div>
                                        <div className="paid-label">Paid by customer</div>
                                        <div className="paid-note">Payment due when invoice is sent</div>
                                    </div>
                                    <div style={{
                                        textAlign: 'right',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        gap: '6px' // Or simply: gap: 6
                                        }}>
                                        <span>$0.00</span>
                                        <a className="edit-link">Edit</a>
                                    </div>
                                </div>

                                <div className="promo-bar">
                                <span className="promo-text">Review your order at a glance on the Order Summary page.</span>
                                <div className="promo-actions">
                                    <button className="btn">Send invoice</button>
                                    <button className="btn btn-primary">Collect payment</button>
                                </div>
                                </div>
                            </div>

   

    </div>

    <div className="col-side">

     

      <div className="card side-card">
        <div className="card-header">
          <h2 className="card-title">Customers</h2>
          <svg className="chevron" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
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
                <Footer />
            </div>
        </>
  )
}

export default OrderView
