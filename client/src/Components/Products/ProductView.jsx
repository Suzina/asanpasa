import useDashboardUI from '../../hooks/useDashboardUI';
import Sidebar from '../Layouts/Sidebar';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { Toaster, toast } from "react-hot-toast";

function ProductView() 
{
  useDashboardUI(); 
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  return (
     <>
    <Sidebar/>
    <div className="ec-page-wrapper">
      <Header/>
		<div className="ec-content-wrapper">
            <div className="content">
                <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
                    <h1>Products</h1>
                    <Toaster
                    position="top-right"
                    reverseOrder={false}
                    />
                    <p className="breadcrumbs"><span><a href={`${baseUrl}/dashboard`}>Home</a></span>
                    <span><i className="mdi mdi-chevron-right"></i></span>Products</p>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-lg-12">
                      <div class="order-card">
                        <div class="order-card__header">
                          <span class="order-card__id">#CM9801</span>
                          <span class="badge-status badge-inprogress">In Progress</span>
                        </div>
                        <div class="order-row">
                          <span class="order-row__label">User</span>
                          <span class="order-row__value order-row__user">
                            <img src="https://i.pravatar.cc/40?img=47" alt="Natali Craig" />
                            Natali Craig
                          </span>
                        </div>
                        <div class="order-row">
                          <span class="order-row__label">Project</span>
                          <span class="order-row__value">Landing Page</span>
                        </div>
                        <div class="order-row">
                          <span class="order-row__label">Address</span>
                          <span class="order-row__value">Meadow Lane Oakland</span>
                        </div>
                        <div class="order-row">
                          <span class="order-row__label">Date</span>
                          <span class="order-row__value">Just now</span>
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

export default ProductView
