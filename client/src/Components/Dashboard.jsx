import useDashboardUI from '../hooks/useDashboardUI';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import { axiosPrivate } from '../api/axios';

function Dashboard() 
{
  const [orders, setOrders] = useState([]);
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
      
      getUpcommingOrders();

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
              <div className="col-6 col-md-3">
                <a href={`${baseUrl}/admin/orders`} className='text-white'>
                  <div className="dbx-stat-card dbx-blue">
                    <div className="dbx-stat-icon"><i className="mdi mdi-cart-heart"></i></div>
                    <div className="dbx-stat-label">Pending Orders</div>
                    <div>
                      <div className="dbx-stat-value">20</div>
                      <div className="dbx-stat-change">+11.01%</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-6 col-md-3">
                <div className="dbx-stat-card dbx-dark">
                  <a href={`${baseUrl}/admin/order/add`} className='text-black'>
                    <div className="dbx-stat-icon"><i className="mdi mdi-cart-heart"></i></div>
                    <div className="dbx-stat-label">Add New Orders</div>
                    <div>
                      <div className="dbx-stat-value">30</div>
                      <div className="dbx-stat-change">-0.03%</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="row g-3">
              <h3 className='p-20'>Upcomming Deliveries</h3>
              <p className='text-right'>{orders.length} of {orders.length}</p>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <div className="col-12 col-md-4 mb-30" key={order.id}>
                    <div className="order-card">
                      <div className="order-card-header">
                        <div className="customer">
                          <div className="order-avatar">
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
                          <div className="notes-text">{order.phonenumber}</div>
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
