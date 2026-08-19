import { useState } from "react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const menuItems = [
  { type: "link", label: "Dashboard", icon: "mdi-view-dashboard-outline", href: baseUrl, divider: true },
  { type: "link", label: "Category", icon: "mdi-dns-outline", href: `${baseUrl}/admin/categories` },
  { type: "link", label: "Products", icon: "mdi-format-list-bulleted", href: `${baseUrl}/admin/products` },
  {
    type: "sub",
    id: "orders",
    label: "Orders",
    icon: "mdi mdi-cart-heart",
    children: [
      { label: "New Orders", href: `${baseUrl}/admin/orders` },
      { label: "Add Order", href: `${baseUrl}/admin/order/add` },
    ],
  },
  { type: "link", label: "Users", icon: "mdi-format-list-bulleted", href: `${baseUrl}/admin/users` },

];
function Sidebar() 
{
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((current) => (current === id ? null : id));
  return (
    <div className="ec-left-sidebar ec-bg-sidebar">
      <div id="sidebar" className="sidebar ec-sidebar-footer">
        <div className="ec-brand">
          <a href={`${baseUrl}`} title="AsanPasa">
            <img className="ec-brand-icon" src="/img/logo/logo.webp" alt="" />
            <span className="ec-brand-name text-truncate">AsanPasa:</span>
          </a>
        </div>
        <div className="ec-navigation" data-simplebar>
          <ul className="nav sidebar-inner" id="sidebar-menu">
            {menuItems.map((item) => {
              if (item.type === "link") {
                return (
                  <li key={item.label} className={item.label === "Dashboard" ? "active" : ""}>
                    <a className="sidenav-item-link" href={item.href}>
                      <i className={`mdi ${item.icon}`}></i>
                      <span className="nav-text">{item.label}</span>
                    </a>
                    {item.divider && <hr />}
                  </li>
                );
              }

              const isOpen = openId === item.id;
              return (
                <li key={item.id} className={`has-sub ${isOpen ? "expand" : ""}`}>
                  <a
                    type="button"
                    className="sidenav-item-link has-sub-toggle"
                    aria-expanded={isOpen}
                    onClick={() => toggle(item.id)}
                  >
                    <i className={`mdi ${item.icon}`}></i>
                    <span className="nav-text">{item.label}</span>
                    <b className="caret"></b>
                  </a>
                  <div className={`collapse ${isOpen ? "show" : ""}`}>
                    <ul className="sub-menu" id={item.id} data-parent="#sidebar-menu">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a className="sidenav-item-link" href={child.href}>
                            <span className="nav-text">{child.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;