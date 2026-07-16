import React from 'react'

function Dashboard() {
  return (
  <>
      <div class="ec-left-sidebar ec-bg-sidebar">
          <div id="sidebar" class="sidebar ec-sidebar-footer">

            <div class="ec-brand">
              <a href="index.html" title="Ekka">
                <img class="ec-brand-icon" src="assets/img/logo/ec-site-logo.png" alt="" />
                <span class="ec-brand-name text-truncate">Ekka</span>
              </a>
            </div>

            <div class="ec-navigation" data-simplebar>
              <ul class="nav sidebar-inner" id="sidebar-menu">
                <li class="active">
                  <a class="sidenav-item-link" href="index.html">
                    <i class="mdi mdi-view-dashboard-outline"></i>
                    <span class="nav-text">Dashboard</span>
                  </a>
                  <hr/>
                </li>

                <li class="has-sub">
                  <a class="sidenav-item-link" href="javascript:void(0)">
                    <i class="mdi mdi-account-group-outline"></i>
                    <span class="nav-text">Vendors</span> <b class="caret"></b>
                  </a>
                  <div class="collapse">
                    <ul class="sub-menu" id="vendors" data-parent="#sidebar-menu">
                      <li class="">
                        <a class="sidenav-item-link" href="vendor-card.html">
                          <span class="nav-text">Vendor Grid</span>
                        </a>
                      </li>

                      <li class="">
                        <a class="sidenav-item-link" href="vendor-list.html">
                          <span class="nav-text">Vendor List</span>
                        </a>
                      </li>
                      <li class="">
                        <a class="sidenav-item-link" href="vendor-profile.html">
                          <span class="nav-text">Vendors Profile</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li class="has-sub">
                  <a class="sidenav-item-link" href="javascript:void(0)">
                    <i class="mdi mdi-account-group"></i>
                    <span class="nav-text">Users</span> <b class="caret"></b>
                  </a>
                  <div class="collapse">
                    <ul class="sub-menu" id="users" data-parent="#sidebar-menu">
                      <li>
                        <a class="sidenav-item-link" href="user-card.html">
                          <span class="nav-text">User Grid</span>
                        </a>
                      </li>

                      <li class="">
                        <a class="sidenav-item-link" href="user-list.html">
                          <span class="nav-text">User List</span>
                        </a>
                      </li>
                      <li class="">
                        <a class="sidenav-item-link" href="user-profile.html">
                          <span class="nav-text">Users Profile</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <hr/>
                </li>

                <li class="has-sub">
                  <a class="sidenav-item-link" href="javascript:void(0)">
                    <i class="mdi mdi-dns-outline"></i>
                    <span class="nav-text">Categories</span> <b class="caret"></b>
                  </a>
                  <div class="collapse">
                    <ul class="sub-menu" id="categorys" data-parent="#sidebar-menu">
                      <li class="">
                        <a class="sidenav-item-link" href="main-category.html">
                          <span class="nav-text">Main Category</span>
                        </a>
                      </li>
                      <li class="">
                        <a class="sidenav-item-link" href="sub-category.html">
                          <span class="nav-text">Sub Category</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li class="has-sub">
                  <a class="sidenav-item-link" href="javascript:void(0)">
                    <i class="mdi mdi-palette-advanced"></i>
                    <span class="nav-text">Products</span> <b class="caret"></b>
                  </a>
                  <div class="collapse">
                    <ul class="sub-menu" id="products" data-parent="#sidebar-menu">
                      <li class="">
                        <a class="sidenav-item-link" href="product-add.html">
                          <span class="nav-text">Add Product</span>
                        </a>
                      </li>
                      <li class="">
                        <a class="sidenav-item-link" href="product-list.html">
                          <span class="nav-text">List Product</span>
                        </a>
                      </li>
                      <li class="">
                        <a class="sidenav-item-link" href="product-grid.html">
                          <span class="nav-text">Grid Product</span>
                        </a>
                      </li>
                      <li class="">
                        <a class="sidenav-item-link" href="product-detail.html">
                          <span class="nav-text">Product Detail</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li class="has-sub">
                  <a class="sidenav-item-link" href="javascript:void(0)">
                    <i class="mdi mdi-cart"></i>
                    <span class="nav-text">Orders</span> <b class="caret"></b>
                  </a>
                  <div class="collapse">
                    <ul class="sub-menu" id="orders" data-parent="#sidebar-menu">
                      <li class="">
                        <a class="sidenav-item-link" href="new-order.html">
                          <span class="nav-text">New Order</span>
                        </a>
                      </li>
                      <li class="">
                        <a class="sidenav-item-link" href="order-history.html">
                          <span class="nav-text">Order History</span>
                        </a>
                      </li>
                      <li class="">
                        <a class="sidenav-item-link" href="order-detail.html">
                          <span class="nav-text">Order Detail</span>
                        </a>
                      </li>
                      <li class="">
                        <a class="sidenav-item-link" href="invoice.html">
                          <span class="nav-text">Invoice</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <a class="sidenav-item-link" href="review-list.html">
                    <i class="mdi mdi-star-half"></i>
                    <span class="nav-text">Reviews</span>
                  </a>
                </li>

                <li>
                  <a class="sidenav-item-link" href="brand-list.html">
                    <i class="mdi mdi-tag-faces"></i>
                    <span class="nav-text">Brands</span>
                  </a>
                  <hr/>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="ec-page-wrapper">
        <div class="ec-content-wrapper">
          <div class="content">
            <div class="row">
						<div class="col-xl-3 col-sm-6 p-b-15 lbl-card">
							<div class="card card-mini dash-card card-1">
								<div class="card-body">
									<h2 class="mb-1">1,503</h2>
									<p>Daily Signups</p>
									<span class="mdi mdi-account-arrow-left"></span>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 p-b-15 lbl-card">
							<div class="card card-mini dash-card card-2">
								<div class="card-body">
									<h2 class="mb-1">79,503</h2>
									<p>Daily Visitors</p>
									<span class="mdi mdi-account-clock"></span>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 p-b-15 lbl-card">
							<div class="card card-mini dash-card card-3">
								<div class="card-body">
									<h2 class="mb-1">15,503</h2>
									<p>Daily Order</p>
									<span class="mdi mdi-package-variant"></span>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 p-b-15 lbl-card">
							<div class="card card-mini dash-card card-4">
								<div class="card-body">
									<h2 class="mb-1">$98,503</h2>
									<p>Daily Revenue</p>
									<span class="mdi mdi-currency-usd"></span>
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
