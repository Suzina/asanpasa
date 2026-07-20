import React from 'react'

function Sidebar() {
  return (
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
  )
}

export default Sidebar
