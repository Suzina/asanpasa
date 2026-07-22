import useDashboardUI from '../hooks/useDashboardUI';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import { axiosPrivate } from '../api/axios';

function Dashboard() 
{
  const [users, setUsers] = useState([]);
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
              console.log(response.data);
              isMounted && setUsers(response.data);
          } 
          catch (err) 
          {
              console.log(err);
          }
        }

        getUsers();

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
          
              <div className="row">
                  <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                    <div className="card card-mini dash-card card-1">
                      <div className="card-body">
                        <h2 className="mb-1">{users.length}</h2>
                        <p>Daily Signups</p>
                        <span className="mdi mdi-account-arrow-left"></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                    <div className="card card-mini dash-card card-2">
                      <div className="card-body">
                        <h2 className="mb-1">79,503</h2>
                        <p>Daily Visitors</p>
                        <span className="mdi mdi-account-clock"></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                    <div className="card card-mini dash-card card-3">
                      <div className="card-body">
                        <h2 className="mb-1">15,503</h2>
                        <p>Daily Order</p>
                        <span className="mdi mdi-package-variant"></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                    <div className="card card-mini dash-card card-4">
                      <div className="card-body">
                        <h2 className="mb-1">$98,503</h2>
                        <p>Daily Revenue</p>
                        <span className="mdi mdi-currency-usd"></span>
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="row">
                              <div className="col-xl-4 col-12 p-b-15">
							<div className="card card-default Sold-card-table">
								<div className="card-header justify-content-between">
									<h2>Recent Users</h2>
									<div className="tools">
										<button className="text-black-50 mr-2 font-size-20"><i
												className="mdi mdi-cached"></i></button>
										<div className="dropdown show d-inline-block widget-dropdown">
											<a className="dropdown-toggle icon-burger-mini" href="#" role="button"
												id="dropdown-units" data-bs-toggle="dropdown" aria-haspopup="true"
												aria-expanded="false" data-display="static"></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li className="dropdown-item"><a href="#">Action</a></li>
												<li className="dropdown-item"><a href="#">Another action</a></li>
												<li className="dropdown-item"><a href="#">Something else here</a></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="card-body py-0 compact-units" data-simplebar >
									<table className="table ">
										<tbody>
                        {users.map((user) => (
											<tr key={user.id}>
                        <td className="text-dark">{user.id}</td>
												<td className="text-dark">{user.username}</td>
												<td className="text-center">{user.email_address}</td>
												<td className="text-right">{user.phone_number} <i
														className="mdi mdi-arrow-up-bold text-success pl-1 font-size-12"></i>
												</td>
											</tr>
                      ))}
										</tbody>
									</table>

								</div>
								<div className="card-footer d-flex flex-wrap bg-white">
									<a href="#" className="text-uppercase py-3">View Report</a>
								</div>
							</div>
						</div>
                  <div className="col-xl-8 col-md-12 p-b-15">
                    <div id="user-acquisition" className="card card-default">
                      <div className="card-header">
                        <h2>Sales Report</h2>
                      </div>
                      <div className="card-body">
                        <ul className="nav nav-tabs nav-style-border justify-content-between justify-content-lg-start border-bottom"
                          role="tablist">
                          <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#todays" role="tab"
                              aria-selected="true">Today's</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#monthly" role="tab"
                              aria-selected="false">Monthly </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#yearly" role="tab"
                              aria-selected="false">Yearly</a>
                          </li>
                        </ul>
                        <div className="tab-content pt-4" id="salesReport">
                          <div className="tab-pane fade show active" id="source-medium" role="tabpanel">
                            <div className="mb-6" style={{ maxHeight: '247px' }}>
                              <canvas id="acquisition" className="chartjs2"></canvas>
                              <div id="acqLegend" className="customLegend mb-2"></div>
                            </div>
                          </div>
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

export default Dashboard
