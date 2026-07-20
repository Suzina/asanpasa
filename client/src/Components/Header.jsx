
import { useNavigate } from 'react-router-dom';

function Header() 
{
	const username = sessionStorage.getItem("username");
	const navigate = useNavigate();

	function handleLogout(e) 
	{
		e.preventDefault();
		alert("clicked");
  		sessionStorage.removeItem("accessToken"); // or whatever key you stored it under
  		sessionStorage.removeItem("username");
  		navigate("/");
	}

  return (
    <div>
		      <h3>Hello! {username}</h3>

      	<header className="ec-main-header" id="header">
				<nav className="navbar navbar-static-top navbar-expand-lg">
					<button id="sidebar-toggler" className="sidebar-toggle"></button>
					<div className="search-form d-lg-inline-block">
						<div className="input-group">
							<input type="text" name="query" id="search-input" className="form-control"
								placeholder="search.." />
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
									<img src="/img/user/user.png" className="user-image" alt="User Image" />
								</button>
								<ul className="dropdown-menu dropdown-menu-right ec-dropdown-menu">
									<li className="dropdown-header">
										<img src="/img/user/user.png" className="img-circle" alt="User Image" />
										<div className="d-inline-block">
											{username} <small className="pt-1">john.example@gmail.com</small>
										</div>
									</li>
									
									<li className="dropdown-footer">
										<a href="#" onClick={handleLogout}> <i className="mdi mdi-logout"></i> Log Out </a>
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
										</ul>

										<div className="tab-content" id="myNotifications">
											<div className="tab-pane fade show active" id="home2" role="tabpanel">
												<ul className="list-unstyled" data-simplebar style={{height: '360px'}}>
													<li>
														<a href="javscript:void(0)"
															className="media media-message media-notification">
															<div className="position-relative mr-3">
																<img className="rounded-circle" src="/img/user/u2.jpg"
																	alt="Image"/>
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
												</ul>
											</div>

										</div>
									</div>
								</div>
							</li>
							
						</ul>
					</div>
				</nav>
			</header>
    </div>
  )
}

export default Header
