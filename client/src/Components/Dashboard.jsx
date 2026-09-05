import useDashboardUI from '../hooks/useDashboardUI';
import Sidebar from './Layouts/Sidebar';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import { useEffect, useState } from "react";
import { axiosPrivate } from '../api/axios';
import { getTodayBS } from "@himal_bhattarai/nepali-datepicker";

function Dashboard() 
{
  const [orders, setOrders] = useState([]);
  const [total_pending_orders, setTotalPendingOrders] = useState(0);
  const [total_orders, setTotalOrders] = useState(0);
  //const { year, month, day } = getTodayBS();
  //const formatted = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const today = getTodayBS(); // { year, month, day } — month is 1-indexed
  const monthNamesEn = [
    "Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
    "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
  ];
  const monthNameEn = monthNamesEn[today.month - 1];
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }); 

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => 
  {
      let isMounted = true;
      const controller = new AbortController();

      const getUpcommingOrders = async (signal) => 
      {
          try 
          {
              const response = await axiosPrivate.get("/orders/upcomming-orders", {
                  signal,
              });
             setTotalPendingOrders(response.data.length);
            setOrders(response.data);
          } 
          catch (err) 
          {
              console.log(err);
          }
          finally
          {
          }
      }
      const getTotalOrders = async (signal) => 
      {
          try 
          {
              const response = await axiosPrivate.get("/orders/get-total-orders", {
                  signal,
              });
             
             setTotalOrders(response.data.totalItems);
          } 
          catch (err) 
          {
              console.log(err);
          }
          finally
          {
          }
      }
      
      getUpcommingOrders();
      getTotalOrders();
      return () => {
          isMounted = false;
          controller.abort();
      }
  }, [])

  useDashboardUI(); 
  return (
  <>
    <Sidebar/>
    <div className="ec-page-wrapper">
      <Header/>
        <div className="ec-content-wrapper">
          <div className="content">
            <div className="row g-3">
           
              <div className="col-7">
                <div className="card-date dbx-green">
                  <div className="date-info">
                    <span className="day-month">{today.day} {monthNameEn}</span>
                    <span className="weekday">{dayName}</span>
                  </div>
                  <span className="year">{today.year} <i className="mdi mdi-calendar-heart-outline"></i></span>
                </div>
              </div>
              <div className="col-5">
                <div className="card-date dbx-yellow">
                  <a href={`${baseUrl}/admin/products`} className='text-white'>
                  <div className="date-info">
                    <span className="day-month">10</span>
                    <span className="weekday">Products</span>
                  </div>
                  </a>
                  <span className="year"><i className="mdi mdi-format-list-bulleted"></i></span>
                </div>
              </div>
              <div className="col-6 col-md-3 mt-3">
                <a href={`${baseUrl}/admin/orders`} className='text-white'>
                  <div className="dbx-stat-card dbx-blue">
                    <div className="dbx-stat-icon"><i className="mdi mdi-cart-heart"></i></div>
                    <div className="dbx-stat-label">Pending Orders</div>
                    <div>
                      <div className="dbx-stat-value">{total_pending_orders}</div>
                      <div className="dbx-stat-change">+11.01%</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-6 col-md-3 mt-3">
                <div className="dbx-stat-card dbx-pink">
                  <a href={`${baseUrl}/admin/order/add`} className='text-black'>
                    <div className="dbx-stat-icon"><i className="mdi mdi-cart-heart"></i></div>
                    <div className="dbx-stat-label">Add New Orders</div>
                    <div>
                      <div className="dbx-stat-value">{total_orders}</div>
                      <div className="dbx-stat-change">-0.03%</div>
                    </div>
                  </a>
                </div>
              </div>
             
            </div>
           
            <div className="row g-3 mt-3 p-20">
                <div className="col-8 col-md-12">
                  <h4 className=''>Upcomming Deliveries</h4>
                </div>
                <div className="col-4 col-md-12">
                  <p className='text-right mb-10'>{orders.length} of {orders.length}</p>
                </div>
            </div>
            <div className="row g-3">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <div className="col-12 col-md-3 col-sm-4 mb-30" key={order.id}>
                    <div className="order-card">
                      <div className="order-card-header">
                        <div className="customer">
                          <div className="order-avatar">
                            <img src="/img/user/u8.jpg" width="38px"/>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                          <div>
                            <div className="customer-name">  {order.fullname || "N/A"}</div>
                            <div className="order-id">Order #{order.id}</div>
                          </div>
                        </div>
                        {order.status == "Delivered" ? (
                          <div className="status text-success">
                            {order.status}
                            <i className="mdi mdi-check"></i>
                          </div>
                        ) : order.status == "Cancelled" ? (
                          <div className="status text-danger">
                            {order.status}
                            <i className="ml mdi mdi-check"></i>
                          </div>
                        ) : (
                          <div className="status text-warning">
                            {order.status}
                            <i className="ml-1 mdi mdi-clock-time-four-outline"></i>
                          </div>
                        )}
                      </div>

                      <div className="info-row">
                        <div className="info-block">
                          <div className="info-label text-dark">Delivery date</div>
                          <div className="info-value">{order.delivery_date ?? "N/A"}</div>
                        </div>
                        <div className="info-block right">
                          <div className="info-label">Total payment</div>
                          <div className="info-value">{order.total_amt ?? "N/A"}</div>
                        </div>
                      </div>

                      <div className="items">
                        {order.orderItems && order.orderItems.length > 0 ? (
                          order.orderItems.map((item) => (
                            <div className="item" key={item.id}>
                              <img className="item-thumb" src="https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk=" alt="Beef steak" />
                              <div className="item-info">
                                <div className="item-name">{item.product?.name || "Product not found"}</div>
                                <div className="item-price">Rs {item.price}</div>
                              </div>
                              <div className="item-qty">{item.quantity}x</div>
                            </div>
                          ))
                        ) : (
                          <div className="col-12 text-center py-30">
                            <p>No Product found.</p>
                          </div>
                        )}
                      </div>
                      <div className="more-items">+2 more items</div>
                        <div className="notes">
                          <div className="notes-text">{order.phonenumber}, {order.phonenumber2}</div>
                          <div className="notes-text">{order.address}</div>
                        </div>
                        <a href={`${baseUrl}/admin/order/${order.id}`} className="details-btn">
                          Order details
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7"></path>
                            <path d="M7 7h10v10"></path>
                          </svg>
                        </a>
                      </div>
                  
                  </div>
                ))
            ) : (
              <div className="col-12 text-center py-30">
                <p>No orders found.</p>
              </div>
            )}
            </div>
          </div>
        </div>
        <Footer />
        </div>
	</> 
  )
}

export default Dashboard
