import React from 'react'
import useDashboardUI from '../hooks/useDashboardUI';

function Dashboard() {
  useDashboardUI(); 
  return (
  <>
      <div className="ec-left-sidebar ec-bg-sidebar">
          <div id="sidebar" className="sidebar ec-sidebar-footer">

            <div className="ec-brand">
              <a href="index.html" title="Ekka">
                <img className="ec-brand-icon" src="/img/logo/ec-site-logo.png" alt="" />
                <span className="ec-brand-name text-truncate">AsanPasa</span>
              </a>
            </div>

            <div className="ec-navigation" data-simplebar>
              <ul className="nav sidebar-inner" id="sidebar-menu">
                <li className="active">
                  <a className="sidenav-item-link" href="index.html">
                    <i className="mdi mdi-view-dashboard-outline"></i>
                    <span className="nav-text">Dashboard</span>
                  </a>
                  <hr/>
                </li>

                <li className="has-sub">
                  <a className="sidenav-item-link" href="javascript:void(0)">
                    <i className="mdi mdi-account-group-outline"></i>
                    <span className="nav-text">Vendors</span> <b className="caret"></b>
                  </a>
                  <div className="collapse">
                    <ul className="sub-menu" id="vendors" data-parent="#sidebar-menu">
                      <li className="">
                        <a className="sidenav-item-link" href="vendor-card.html">
                          <span className="nav-text">Vendor Grid</span>
                        </a>
                      </li>

                      <li className="">
                        <a className="sidenav-item-link" href="vendor-list.html">
                          <span className="nav-text">Vendor List</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="sidenav-item-link" href="vendor-profile.html">
                          <span className="nav-text">Vendors Profile</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="has-sub">
                  <a className="sidenav-item-link" href="javascript:void(0)">
                    <i className="mdi mdi-account-group"></i>
                    <span className="nav-text">Users</span> <b className="caret"></b>
                  </a>
                  <div className="collapse">
                    <ul className="sub-menu" id="users" data-parent="#sidebar-menu">
                      <li>
                        <a className="sidenav-item-link" href="user-card.html">
                          <span className="nav-text">User Grid</span>
                        </a>
                      </li>

                      <li className="">
                        <a className="sidenav-item-link" href="user-list.html">
                          <span className="nav-text">User List</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="sidenav-item-link" href="user-profile.html">
                          <span className="nav-text">Users Profile</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <hr/>
                </li>

                <li className="has-sub">
                  <a className="sidenav-item-link" href="javascript:void(0)">
                    <i className="mdi mdi-dns-outline"></i>
                    <span className="nav-text">Categories</span> <b className="caret"></b>
                  </a>
                  <div className="collapse">
                    <ul className="sub-menu" id="categorys" data-parent="#sidebar-menu">
                      <li className="">
                        <a className="sidenav-item-link" href="main-category.html">
                          <span className="nav-text">Main Category</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="sidenav-item-link" href="sub-category.html">
                          <span className="nav-text">Sub Category</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="has-sub">
                  <a className="sidenav-item-link" href="javascript:void(0)">
                    <i className="mdi mdi-palette-advanced"></i>
                    <span className="nav-text">Products</span> <b className="caret"></b>
                  </a>
                  <div className="collapse">
                    <ul className="sub-menu" id="products" data-parent="#sidebar-menu">
                      <li className="">
                        <a className="sidenav-item-link" href="product-add.html">
                          <span className="nav-text">Add Product</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="sidenav-item-link" href="product-list.html">
                          <span className="nav-text">List Product</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="sidenav-item-link" href="product-grid.html">
                          <span className="nav-text">Grid Product</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="sidenav-item-link" href="product-detail.html">
                          <span className="nav-text">Product Detail</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="has-sub">
                  <a className="sidenav-item-link" href="javascript:void(0)">
                    <i className="mdi mdi-cart"></i>
                    <span className="nav-text">Orders</span> <b className="caret"></b>
                  </a>
                  <div className="collapse">
                    <ul className="sub-menu" id="orders" data-parent="#sidebar-menu">
                      <li className="">
                        <a className="sidenav-item-link" href="new-order.html">
                          <span className="nav-text">New Order</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="sidenav-item-link" href="order-history.html">
                          <span className="nav-text">Order History</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="sidenav-item-link" href="order-detail.html">
                          <span className="nav-text">Order Detail</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="sidenav-item-link" href="invoice.html">
                          <span className="nav-text">Invoice</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <a className="sidenav-item-link" href="review-list.html">
                    <i className="mdi mdi-star-half"></i>
                    <span className="nav-text">Reviews</span>
                  </a>
                </li>

                <li>
                  <a className="sidenav-item-link" href="brand-list.html">
                    <i className="mdi mdi-tag-faces"></i>
                    <span className="nav-text">Brands</span>
                  </a>
                  <hr/>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ec-page-wrapper">
          <div className="ec-content-wrapper">
            <div className="content">
                  <div className="row">
                  <div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
                    <div className="card card-mini dash-card card-1">
                      <div className="card-body">
                        <h2 className="mb-1">1,503</h2>
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
        </div>
	</> 
  )
}

export default Dashboard
