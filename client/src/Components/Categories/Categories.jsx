import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { axiosPrivate } from '../../api/axios';
import Footer from '../Footer';
const URL = '/categories';

function Categories() {

    const userRef = useRef();
    const errRef = useRef();
    const successRef = useRef();
    const [name, setName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState(false);
    const [categories, setCat] = useState([]);
    const [loading, setLoading] = useState(false);

    
    const getCats = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get(URL, { signal });
            setCat(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleSubmit= async (e) =>
    {
        e.preventDefault();
        console.log(JSON.stringify({ name }));
        try
        {
            const response = await axiosPrivate.post(URL,
            JSON.stringify({ name }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
    
            if (response.data.error) 
            {
                setErrMsg(response.data.error);
            } 
            else 
            {
                setSuccessMsg("New Category Added!");
                setName('');       
                setCat(prev => [ response.data,...prev]); 

            }
            console.log(JSON.stringify(response?.data));
            
        }
        catch (err)
        {
            console.log(err)
    
            if (!err?.response) 
            {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Name');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    useEffect(() => 
    {
        const controller = new AbortController();
        getCats(controller.signal);
        return () => controller.abort();
    }, [])
  return (
    <>
    <Sidebar/>
    <div className="ec-page-wrapper">
      <Header/>
		<div className="ec-content-wrapper">
            <div className="content">
                <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
                    <h1>Categories</h1>
                    <p className="breadcrumbs"><span><a href="index.html">Home</a></span>
                    <span><i className="mdi mdi-chevron-right"></i></span>Main Categories</p>
                </div>
                <div className="row">
                    <div className="col-xl-4 col-lg-12">
                        <div className="ec-cat-list card card-default mb-24px">
                            <div className="card-body">
                                <div className="ec-cat-form">
                                    <h4>Add New Category</h4>
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                        <p ref={successRef} className={successMsg ? "successMsg" : "offscreen"} aria-live="assertive">{successMsg}</p>
                                        <form id="catForm" onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="text" className="col-12 col-form-label">Name</label> 
                                                <div className="col-12">
                                                    <input name="name" className="form-control here slug-title" type="text" 
                                                    id="name"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    placeholder="Enter category name" required
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <button name="submit" type="submit" className="btn btn-primary">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-12">
                            <div className="ec-cat-list card card-default">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table id="responsive-data-table" className="table">
                                            <thead>
                                                <tr>
                                                    <th>Thumb</th>
                                                    <th>Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {categories.map((category) => (
                                                    <tr key={category.id}>
                                                        <td><img className="cat-thumb" src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg" alt="{category.name}" /></td>
                                                        <td>{category.name}</td>
                                                        <td>
														<div className="btn-group">
															<button type="button"
																className="btn btn-outline-success">View</button>
															<button type="button"
																className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
																data-bs-toggle="dropdown" aria-haspopup="true"
																aria-expanded="false" data-display="static">
																<span className="sr-only">Info</span>
															</button>

															<div className="dropdown-menu">
																<a className="dropdown-item" href="#">Edit</a>
																<a className="dropdown-item" href="#">Delete</a>
															</div>
														</div>
													</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default Categories
