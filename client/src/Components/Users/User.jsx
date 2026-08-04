import useDashboardUI from '../../hooks/useDashboardUI';
import { useRef, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import { Toaster, toast } from "react-hot-toast";
import { axiosPrivate } from '../../api/axios';
const URL = '/products';

function Users() 
{
    useDashboardUI(); 
    
    const userRef = useRef();
    const errRef = useRef();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [editingId, setEditingId] = useState(null);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState('');

    const getProducts = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get(URL, { signal });
            setProducts(response.data);
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
    const getCats = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get('/categories', { signal });
            setCategories(response.data);
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
    const resetForm = () => 
    {
        setName('');
        setEditingId(null);
    }
    const handleSubmit= async (e) =>
    {
        e.preventDefault();
        try
        {
            let response;
            if (editingId !== null) 
            {
                response = await axiosPrivate.put(`${URL}/${editingId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
                 });
    
                if (response.data.error) 
                {
                    toast.error(response.data.error)
                } 
                else 
                {
                    toast.success("Product Updated!");
                    setProducts(prev =>
                        prev.map(prod =>
                            prod.id === editingId ? { ...prod, ...response.data } : prod
                        )
                    );
                    resetForm();
                }

            }
            else
            {
                response = await axiosPrivate.post(URL,
                JSON.stringify({ name,price,image,category_id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );
                
                if (response.data.error) 
                {
                    toast.error(response.data.error);
                    console.log(response.data).error;

                } 
                else 
                {
                    
                    toast.success("New Product Added!");
                    console.log(response.data);
                    setProducts(prev => [ response.data,...prev]); 
                    resetForm();
                }
            }
            
            
        }
        catch (err)
        {
            console.log(err)
    
            if (!err?.response) 
            {
                toast.error('No Server Response');
            } else if (err.response?.status === 400) {
                toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');
            } else if (err.response?.status === 401) {
                toast.error('Unauthorized');
            } else {
                toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');

            }
            errRef.current.focus();
        }
    }

    const handleEditClick = (editprod) => 
    {
        setName(editprod.name);
        setPrice(editprod.price);
        setCat(editprod.category_id);
        setEditingId(editprod.id);
        userRef.current?.focus();
    }

    const handleDeleteClick = async (id) => 
    {
        try 
        {
            await axiosPrivate.delete(`${URL}/${id}`, { withCredentials: true });
            setCat(prev => prev.filter(cat => cat.id !== id));
            if (editingId === id) resetForm();
            toast.success("Category deleted successfully")
        } 
        catch (err) 
        {
            console.log(err)
    
            if (!err?.response) 
            {
                toast.error('No Server Response');
            }
            else 
            {
                toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');
            }
            errRef.current.focus();
        }
    }
    useEffect(() => 
    {
        const controller = new AbortController();
        getProducts();
        getCats();
        return () => controller.abort();
    }, [])
return (
    <>
    <div className="ec-left-sidebar ec-bg-sidebar">
			<div id="sidebar" className="sidebar ec-sidebar-footer">

				<div className="ec-brand">
					<a href="index.html" title="Ekka">
						<img className="ec-brand-icon" src="assets/img/logo/ec-site-logo.png" alt="" />
						<span className="ec-brand-name text-truncate">Ekka</span>
					</a>
				</div>

				<div className="ec-navigation" data-simplebar>
					<ul className="nav sidebar-inner" id="sidebar-menu">
						<li>
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
					</ul>
				</div>
			</div>
        </div>
            <div className="ec-page-wrapper">

			<header className="ec-main-header" id="header">
				<nav className="navbar navbar-static-top navbar-expand-lg">
					<button id="sidebar-toggler" className="sidebar-toggle"></button>
					<div className="search-form d-lg-inline-block">
						<div className="input-group">
							<input type="text" name="query" id="search-input" className="form-control"
								placeholder="search.." autofocus autocomplete="off" />
							<button type="button" name="search" id="search-btn" className="btn btn-flat">
								<i className="mdi mdi-magnify"></i>
							</button>
						</div>
						<div id="search-results-container">
							<ul id="search-results"></ul>
						</div>
					</div>

					<div className="navbar-right">
						<ul className="nav navbar-nav">
							<li className="dropdown user-menu">
								<button className="dropdown-toggle nav-link ec-drop" data-bs-toggle="dropdown"
									aria-expanded="false">
									<img src="assets/img/user/user.png" className="user-image" alt="User Image" />
								</button>
								<ul className="dropdown-menu dropdown-menu-right ec-dropdown-menu">
									<li className="dropdown-header">
										<img src="assets/img/user/user.png" className="img-circle" alt="User Image" />
										<div className="d-inline-block">
											John Deo <small className="pt-1">john.example@gmail.com</small>
										</div>
									</li>
									<li>
										<a href="user-profile.html">
											<i className="mdi mdi-account"></i> My Profile
										</a>
									</li>
									<li>
										<a href="#">
											<i className="mdi mdi-email"></i> Message
										</a>
									</li>
									<li>
										<a href="#"> <i className="mdi mdi-diamond-stone"></i> Projects </a>
									</li>
									<li className="right-sidebar-in">
										<a href="javascript:0"> <i className="mdi mdi-settings-outline"></i> Setting </a>
									</li>
									<li className="dropdown-footer">
										<a href="index.html"> <i className="mdi mdi-logout"></i> Log Out </a>
									</li>
								</ul>
							</li>
							<li className="dropdown notifications-menu custom-dropdown">
								<button className="dropdown-toggle notify-toggler custom-dropdown-toggler">
									<i className="mdi mdi-bell-outline"></i>
								</button>

								<div className="card card-default dropdown-notify dropdown-menu-right mb-0">
									<div className="card-header card-header-border-bottom px-3">
										<h2>Notifications</h2>
									</div>

									<div className="card-body px-0 py-0">
										<ul className="nav nav-tabs nav-style-border p-0 justify-content-between" id="myTab"
											role="tablist">
											<li className="nav-item mx-3 my-0 py-0">
												<a href="#" className="nav-link active pb-3" id="home2-tab"
													data-bs-toggle="tab" data-bs-target="#home2" role="tab"
													aria-controls="home2" aria-selected="true">All (10)</a>
											</li>

											<li className="nav-item mx-3 my-0 py-0">
												<a href="#" className="nav-link pb-3" id="profile2-tab" data-bs-toggle="tab"
													data-bs-target="#profile2" role="tab" aria-controls="profile2"
													aria-selected="false">Msgs (5)</a>
											</li>

											<li className="nav-item mx-3 my-0 py-0">
												<a href="#" className="nav-link pb-3" id="contact2-tab" data-bs-toggle="tab"
													data-bs-target="#contact2" role="tab" aria-controls="contact2"
													aria-selected="false">Others (5)</a>
											</li>
										</ul>

										<div className="tab-content" id="myTabContent3">
											<div className="tab-pane fade show active" id="home2" role="tabpanel"
												aria-labelledby="home2-tab">
												<ul className="list-unstyled" data-simplebar style={{height: '360px'}}>
													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">
															<div className="position-relative mr-3">
																<img className="rounded-circle" src="assets/img/user/u2.jpg"
																	alt="Image" />
																<span className="status away"></span>
															</div>
															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Nitin</h4>
																	<p className="last-msg">Lorem ipsum dolor sit, amet
																		consectetur adipisicing elit. Nam itaque
																		doloremque odio, eligendi delectus vitae.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 30 min
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification media-active">
															<div className="position-relative mr-3">
																<img className="rounded-circle" src="assets/img/user/u1.jpg"
																	alt="Image" />
																<span className="status active"></span>
															</div>
															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Lovina</h4>
																	<p className="last-msg">Donec mattis augue a nisl
																		consequat, nec imperdiet ex rutrum. Fusce et
																		vehicula enim. Sed in enim eu odio vehic.</p>

																	<span
																		className="font-size-12 font-weight-medium text-white">
																		<i className="mdi mdi-clock-outline"></i> Just
																		now...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">
															<div className="position-relative mr-3">
																<img className="rounded-circle" src="assets/img/user/u5.jpg"
																	alt="Image" />
																<span className="status away"></span>
															</div>
															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Crinali</h4>
																	<p className="last-msg">Lorem ipsum dolor sit, amet
																		consectetur adipisicing elit. Nam itaque
																		doloremque odio, eligendi delectus vitae.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 1 hrs
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification event-active">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-info text-white">
																<i className="mdi mdi-calendar-check font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Upcomming event added</h4>
																	<p className="last-msg font-size-14">03/Jan/2020 (1pm -
																		2pm)</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 10 min
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-warning text-white">
																<i className="mdi mdi-chart-areaspline font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Yearly Sales report</h4>
																	<p className="last-msg font-size-14">Lorem ipsum dolor
																		sit, amet consectetur adipisicing elit. Nam
																		itaque doloremque odio, eligendi delectus vitae.
																	</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 1 hrs
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-primary text-white">
																<i
																	className="mdi mdi-account-multiple-check font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">New request</h4>
																	<p className="last-msg font-size-14">Add Dany Jones as
																		your contact consequat nec imperdiet ex rutrum.
																		Fusce et vehicula enim. Sed in enim.</p>

																	<span
																		className="my-1 btn btn-sm btn-success">Accept</span>
																	<span
																		className="my-1 btn btn-sm btn-secondary">Delete</span>

																	<span
																		className="font-size-12 font-weight-medium text-secondary d-block">
																		<i className="mdi mdi-clock-outline"></i> 5 min
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-danger text-white">
																<i className="mdi mdi-server-network-off font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Server overloaded</h4>
																	<p className="last-msg font-size-14">Donec mattis augue
																		a nisl consequat, nec imperdiet ex rutrum. Fusce
																		et vehicula enim. Sed in enim eu odio vehic.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 30 min
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-purple text-white">
																<i className="mdi mdi-playlist-check font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Task complete</h4>
																	<p className="last-msg font-size-14">Nam ut nisi erat.
																		Ut quis tortor varius, hendrerit arcu quis,
																		congue nisl. In scelerisque, sem ut ve.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 2 hrs
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

												</ul>
											</div>

											<div className="tab-pane fade" id="profile2" role="tabpanel"
												aria-labelledby="profile2-tab">
												<ul className="list-unstyled" data-simplebar style={{height: '360px'}}>
													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">
															<div className="position-relative mr-3">
																<img className="rounded-circle" src="assets/img/user/u6.jpg"
																	alt="Image" />
																<span className="status away"></span>
															</div>
															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Hardiko</h4>
																	<p className="last-msg">Donec mattis augue a nisl
																		consequat, nec imperdiet ex rutrum. Fusce et
																		vehicula enim. Sed in enim eu odio vehic.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 1 hrs
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">
															<div className="position-relative mr-3">
																<img className="rounded-circle" src="assets/img/user/u7.jpg"
																	alt="Image" />
																<span className="status away"></span>
															</div>
															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Browin</h4>
																	<p className="last-msg">Nam ut nisi erat. Ut quis tortor
																		varius, hendrerit arcu quis, congue nisl. In
																		scelerisque, sem ut ve.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 1 hrs
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification media-active">
															<div className="position-relative mr-3">
																<img className="rounded-circle" src="assets/img/user/u1.jpg"
																	alt="Image" />
																<span className="status active"></span>
															</div>
															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">jenelia</h4>
																	<p className="last-msg">Donec mattis augue a nisl
																		consequat, nec imperdiet ex rutrum. Fusce et
																		vehicula enim. Sed in enim eu odio vehic.</p>

																	<span
																		className="font-size-12 font-weight-medium text-white">
																		<i className="mdi mdi-clock-outline"></i> Just
																		now...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">
															<div className="position-relative mr-3">
																<img className="rounded-circle" src="assets/img/user/u2.jpg"
																	alt="Image" />
																<span className="status away"></span>
															</div>
															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Bhavlio</h4>
																	<p className="last-msg">Lorem ipsum dolor sit, amet
																		consectetur adipisicing elit. Nam itaque
																		doloremque odio, eligendi delectus vitae.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 1 hrs
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">
															<div className="position-relative mr-3">
																<img className="rounded-circle" src="assets/img/user/u5.jpg"
																	alt="Image" />
																<span className="status away"></span>
															</div>
															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Browini</h4>
																	<p className="last-msg">Lorem ipsum dolor sit, amet
																		consectetur adipisicing elit. Nam itaque
																		doloremque odio, eligendi delectus vitae.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 1 hrs
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

												</ul>
											</div>

											<div className="tab-pane fade" id="contact2" role="tabpanel"
												aria-labelledby="contact2-tab">
												<ul className="list-unstyled" data-simplebar style={{height: '360px'}}>
													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification event-active">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-info text-white">
																<i className="mdi mdi-calendar-check font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Upcomming event added</h4>
																	<p className="last-msg font-size-14">03/Jan/2020 (1pm -
																		2pm)</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 10 min
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-warning text-white">
																<i className="mdi mdi-chart-areaspline font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">New Sales report</h4>
																	<p className="last-msg font-size-14">Lorem ipsum dolor
																		sit, amet consectetur adipisicing elit. Nam
																		itaque doloremque odio, eligendi delectus vitae.
																	</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 1 hrs
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-primary text-white">
																<i
																	className="mdi mdi-account-multiple-check font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">New Request</h4>
																	<p className="last-msg font-size-14">Add Dany Jones as
																		your contact consequat nec imperdiet ex rutrum.
																		Fusce et vehicula enim. Sed in enim.</p>

																	<span
																		className="my-1 btn btn-sm btn-success">Accept</span>
																	<span
																		className="my-1 btn btn-sm btn-secondary">Delete</span>

																	<span
																		className="font-size-12 font-weight-medium text-secondary d-block">
																		<i className="mdi mdi-clock-outline"></i> 5 min
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-danger text-white">
																<i className="mdi mdi-server-network-off font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">Server overloaded</h4>
																	<p className="last-msg font-size-14">Donec mattis augue
																		a nisl consequat, nec imperdiet ex rutrum. Fusce
																		et vehicula enim. Sed in enim eu odio vehic.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 30 min
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>

													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">

															<div
																className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-purple text-white">
																<i className="mdi mdi-playlist-check font-size-20"></i>
															</div>

															<div className="media-body d-flex justify-content-between">
																<div className="message-contents">
																	<h4 className="title">New Task complete</h4>
																	<p className="last-msg font-size-14">Nam ut nisi erat.
																		Ut quis tortor varius, hendrerit arcu quis,
																		congue nisl. In scelerisque, sem ut ve.</p>

																	<span
																		className="font-size-12 font-weight-medium text-secondary">
																		<i className="mdi mdi-clock-outline"></i> 2 hrs
																		ago...
																	</span>
																</div>
															</div>
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>

								<ul className="dropdown-menu dropdown-menu-right d-none">
									<li className="dropdown-header">You have 5 notifications</li>
									<li>
										<a href="#">
											<i className="mdi mdi-account-plus"></i> New user registered
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 10 AM</span>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="mdi mdi-account-remove"></i> User deleted
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 07 AM</span>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="mdi mdi-chart-areaspline"></i> Sales report is ready
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 12 PM</span>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="mdi mdi-account-supervisor"></i> New client
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 10 AM</span>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="mdi mdi-server-network-off"></i> Server overloaded
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 05 AM</span>
										</a>
									</li>
									<li className="dropdown-footer">
										<a className="text-center" href="#"> View All </a>
									</li>
								</ul>
							</li>
							<li className="right-sidebar-in right-sidebar-2-menu">
								<i className="mdi mdi-settings-outline mdi-spin"></i>
							</li>
						</ul>
					</div>
				</nav>
			</header>

			<div className="ec-content-wrapper">
				<div className="content">
					<div className="breadcrumb-wrapper breadcrumb-contacts">
						<div>
							<h1>User List</h1>
							<p className="breadcrumbs"><span><a href="index.html">Home</a></span>
								<span><i className="mdi mdi-chevron-right"></i></span>User
							</p>
						</div>
						<div>
							<button type="button" className="btn btn-primary" data-bs-toggle="modal"
								data-bs-target="#addUser"> Add User
							</button>
						</div>
					</div>
				
				
				</div>
			</div> 

			<footer className="footer mt-auto">
				<div className="copyright bg-white">
					<p>
						Copyright &copy; <span id="ec-year"></span><a className="text-primary"
							href="https://themeforest.net/user/ashishmaraviya" target="_blank"> Ekka Admin
							Dashboard</a>. All Rights Reserved.
					</p>
				</div>
			</footer>

		</div>
    </>
    
  )
}

export default Users
