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
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => 
  {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => 
        {
          try 
          {
            const response = await axiosPrivate.get('/auth', {
                  signal: controller.signal
              });
              isMounted && setUsers(response.data);
          } 
          catch (err) 
          {
            if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") 
            {
                console.log(err);
            }
          }
        }
        const getOrders = async (page = 1, signal) => 
            {
                try 
                {
                    setLoading(true);
                    const response = await axiosPrivate.get("/orders", {
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

        getUsers();
        getOrders();

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
              <div className="col-6 col-md-3 mb-30">
                 <a href="" className='text-white'>
                <div className="dbx-stat-card dbx-blue">
                  <div className="dbx-stat-icon"><i className="mdi mdi-cart-heart"></i></div>
                  <div className="dbx-stat-label">Orders</div>
                  <div>
                    <div className="dbx-stat-value">{orders.length}</div>
                    <div className="dbx-stat-change">+11.01%</div>
                  </div>
                </div>
                </a>
              </div>
              <div className="col-6 col-md-3 mb-30">
                <div className="dbx-stat-card dbx-dark">
                  <a href="" className='text-white'>
                  <div className="dbx-stat-icon"><i className="mdi mdi-cart-heart"></i></div>
                  <div className="dbx-stat-label">Products</div>
                  <div>
                    <div className="dbx-stat-value">{orders.length}</div>
                    <div className="dbx-stat-change">-0.03%</div>
                  </div>
                  </a>
                </div>
              </div>
              <div className="col-6 col-md-3 mb-30">
                <div className="dbx-stat-card dbx-dark">
                  <div className="dbx-stat-icon"><i className="mdi mdi-cart-heart"></i></div>
                  <div className="dbx-stat-label">Categories</div>
                  <div>
                    <div className="dbx-stat-value">{orders.length}</div>
                    <div className="dbx-stat-change">+15.03%</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3 mb-30">
                <div className="dbx-stat-card dbx-blue">
                  <div className="dbx-stat-icon"><i className="mdi mdi-cart-heart"></i></div>
                  <div className="dbx-stat-label">Users</div>
                  <div>
                    <div className="dbx-stat-value">{orders.length}</div>
                    <div className="dbx-stat-change">+6.08%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container grid-wrap">
              <div className="row g-3">
                <p>Today's Orders</p>
                {orders.map((order) => (
                  <div className="col-12 col-md-6 mb-30" key={order.id}>
                    <div className="order-card">
                      <div className="order-card__header">
                        <span className="order-card__id">#AP{order.id}</span>
                          {order.status == "Delivered" ? (
                            <span className="badge-status badge-inprogress">{order.status}<i className="mdi mdi-check text-success"></i></span>
                          ): order.status == "Cancelled" ? (
                            <span className="badge-status badge-inprogress">{order.status}<i className="mdi mdi-check text-danger"></i></span>
                          ) : (
                            <span className="badge-status badge-inprogress">{order.status} <i className="mdi mdi-clock-time-four-outline text-warning"></i></span>
                          )}
                      </div>
                      <div className="order-row">
                        <span className="order-row__label">Fullname</span>
                        <span className="order-row__value order-row__user">
                          {order.fullname}
                        </span>
                      </div>
                      <div className="order-row">
                        <span className="order-row__label">Address</span>
                        <span className="order-row__value">{order.address}</span>
                      </div>
                      <div className="order-row">
                        <span className="order-row__label">Phone Number</span>
                        <span className="order-row__value">{order.phonenumber}</span>
                      </div>
                      <div className="order-row">
                        <span className="order-row__label">Total Amt</span>
                        <span className="order-row__value">{order.total_amt}</span>
                      </div>
                      <div className="order-row">
                        <span className="order-row__label">Date</span>
                        <span className="order-row__value">Just now</span>
                      </div>
                      <div className="order-row">
                        <span className="order-row__label"></span>
                        <a href=""><span className="order-row__value">View Details</span></a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        </div>
	</> 
  )
}

export default Dashboard
