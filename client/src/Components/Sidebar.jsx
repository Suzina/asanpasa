const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Sidebar() 
{
  return (
      <div className="ec-left-sidebar ec-bg-sidebar">
        <div id="sidebar" className="sidebar ec-sidebar-footer">
          <div className="ec-brand">
            <a href={`${baseUrl}`} title="Ekka">
              <img className="ec-brand-icon" src="/img/logo/ec-site-logo.png" alt="" />
              <span className="ec-brand-name text-truncate">AsanPasa</span>
            </a>
          </div>
          <div className="ec-navigation" data-simplebar>
            <ul className="nav sidebar-inner" id="sidebar-menu">
              <li className="active">
                <a className="sidenav-item-link" href={`${baseUrl}`}>
                  <i className="mdi mdi-view-dashboard-outline"></i>
                  <span className="nav-text">Dashboard</span>
                </a>
                <hr/>
              </li>
              <li>
                <a className="sidenav-item-link" href={`${baseUrl}/admin/categories`}>
                  <i className="mdi mdi-dns-outline"></i>
                  <span className="nav-text">Category</span>
                </a>
              </li>
              
              <li>
                <a className="sidenav-item-link" href={`${baseUrl}/admin/products`}>
                  <i className="mdi mdi-format-list-bulleted"></i>
                  <span className="nav-text">Products</span>
                </a>
              </li>
            
						<li class="has-sub">
							<a class="sidenav-item-link" href="javascript:void(0)">
								<i class="mdi mdi-cart-outline"></i>
								<span class="nav-text">Orders</span> <b class="caret"></b>
							</a>
							<div class="collapse">
								<ul class="sub-menu" id="orders" data-parent="#sidebar-menu">
									<li class="">
										<a class="sidenav-item-link" href={`${baseUrl}/admin/orders`}>
											<span class="nav-text">New Order</span>
										</a>
									</li>
									<li class="">
										<a class="sidenav-item-link" href={`${baseUrl}/admin/orders`}>
											<span class="nav-text">Order History</span>
										</a>
									</li>
								</ul>
							</div>
						</li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Sidebar
