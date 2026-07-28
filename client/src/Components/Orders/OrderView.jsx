import {  useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { axiosPrivate } from '../../api/axios';
import Footer from '../Footer';

function CategoryView() 
{
    const [category, setCat] = useState([]);
    const { id } = useParams(); 
    const URL = `/categories/${id}`;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const getCat = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get(URL, { signal });
            setCat(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => 
    {
        const controller = new AbortController();
         if (id) 
        {
            getCat(controller.signal);
        }
        return () => controller.abort();
    }, [id])

    return (
        <>
            <Sidebar/>
            <div className="ec-page-wrapper">
                <Header/>
                <div className="ec-content-wrapper">
                    <div className="content">
                        <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
                            <h1>{category.name}</h1>
                            <p className="breadcrumbs"><span><a href={`${baseUrl}/dashboard`}>Home</a></span>
                            <span><a href={`${baseUrl}/admin/categories`}><i className="mdi mdi-chevron-right"></i>Category</a></span>
                            <span><i className="mdi mdi-chevron-right"></i></span>{category.name}</p>
                        </div>
                        <div class="row">
						    <div class="col-12">
                                <div class="ec-odr-dtl card card-default">
                                    <div class="card-header card-header-border-bottom d-flex justify-content-between">
                                        <h2 class="ec-odr">Order Detail<br />
                                            <span class="small">Order ID: #1082</span>
                                        </h2>
                                    </div>
                                    <div class="card-body">
									    <div class="row">
                                            <div class="col-xl-3 col-lg-6">
                                                <address class="info-grid">
                                                    <div class="info-title"><strong>Customer:</strong></div><br />
                                                    <div class="info-content">
                                                        Twitter, Inc.<br />
                                                        795 Folsom Ave, Suite 600<br />
                                                        San Francisco, CA 94107<br />
                                                        <abbr title="Phone">P:</abbr> (123) 456-7890
                                                    </div>
                                                </address>
										    </div>
                                            <div class="col-xl-3 col-lg-6">
											<address class="info-grid">
												<div class="info-title"><strong>Shipped To:</strong></div><br/>
												<div class="info-content">
													Elaine Hernandez<br/>
													P. Sherman 42,<br/>
													Wallaby Way, Sidney<br/>
													<abbr title="Phone">P:</abbr> (123) 345-6789
												</div>
											</address>
										</div>
										<div class="col-xl-3 col-lg-6">
											<address class="info-grid">
												<div class="info-title"><strong>Payment Method:</strong></div><br/>
												<div class="info-content">
													Visa ending **** 1234<br/>
													h.elaine@gmail.com<br/>
												</div>
											</address>
										</div>
										<div class="col-xl-3 col-lg-6">
											<address class="info-grid">
												<div class="info-title"><strong>Order Date:</strong></div><br/>
												<div class="info-content">
													4:34PM,<br/>
													Wed, Aug 13, 2020
												</div>
											</address>
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

export default CategoryView
