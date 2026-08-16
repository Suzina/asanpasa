import useDashboardUI from '../hooks/useDashboardUI';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import { axiosPrivate } from '../api/axios';

function Dashboard() 
{
  const [orders, setOrders] = useState([]);
  const itemsPerPage = 10;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => 
  {
      let isMounted = true;
      const controller = new AbortController();

      const getUpcommingOrders = async (page = 1, signal) => 
      {
          try 
          {
              const response = await axiosPrivate.get("/orders/upcomming-orders", {
                  params: { page, limit: itemsPerPage },
                  signal,
              });
              console.log(response.data.items);
              setOrders(response.data.items);
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
                      <div className="dbx-stat-value"></div>
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
                      <div className="dbx-stat-value"></div>
                      <div className="dbx-stat-change">-0.03%</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="row g-3">
              <h3 className='p-20'>Upcomming Deliveries</h3>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <div className="col-12 col-md-4 mb-30" key={order.id}>
                    <div className="order-card">
                      <div className="order-card__header">
                        <span className="order-card__id">#AP{order.id}</span>
                        {order.status == "Delivered" ? (
                          <span className="badge badge-success">
                            {order.status}
                            <i className="mdi mdi-check text-success"></i>
                          </span>
                        ) : order.status == "Cancelled" ? (
                          <span className="badge badge-success">
                            {order.status}
                            <i className="mdi mdi-check text-danger"></i>
                          </span>
                        ) : (
                          <span className="badge badge-warning">
                            {order.status} <i className="mdi mdi-clock-time-four-outline text-warning"></i>
                          </span>
                        )}
                      </div>

                      <div className="order-row">
                        <span className="order-row__label">Fullname</span>
                        <span className="order-row__value order-row__user">
                          {order.fullname || "N/A"}
                        </span>
                      </div>

                      <div className="order-row">
                        <span className="order-row__label">Products</span>
                        <span className="order-row__value">
                          {order.orderItems && order.orderItems.length > 0
                            ? order.orderItems
                                .map((item) => item.product?.name || "Product not found")
                                .join(", ")
                            : "No products found"}
                        </span>
                      </div>

                      <div className="order-row">
                        <span className="order-row__label">Total Amt</span>
                        <span className="order-row__value">{order.total_amt ?? "N/A"}</span>
                      </div>

                      <div className="order-row">
                        <span className="order-row__label">Delivery Date</span>
                        <span className="order-row__value">
                          {order.delivery_date || "Not scheduled"}
                        </span>
                      </div>

                      <div className="order-row">
                        <span className="order-row__label"></span>
                        <a href={`${baseUrl}/admin/order/${order.id}`}>
                          <span className="order-row__value">View Details</span>
                        </a>
                      </div>
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
