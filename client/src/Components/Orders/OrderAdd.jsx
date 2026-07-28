import { useRef, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import { Toaster, toast } from "react-hot-toast";
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const URL = '/orders';

function OrderAdd() 
{
    const userRef = useRef();
    const errRef = useRef();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState(null);
    const [products, setProducts] = useState([]);
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [total_amt, setTotalAmt] = useState('');
    const [advance, setAdvance] = useState('');
    const [amt_due, setAmtdue] = useState('');
    const [product_id, setProductId] = useState('');

    const getProducts = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get('/products', { signal });
            setProducts(response.data);
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
   
    const productOptions = products.map(product => ({
        value: product.id,
        label: product.name
    }));
   
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
                JSON.stringify({ product_id,fullname,address,phonenumber,total_amt,advance,amt_due }),
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
                    toast.success("New Order Added!");
                    console.log(response.data);
                    navigate('/admin/orders'); 
                }
            }
            
            
        }
        catch (err)
        {
            console.log(err)
    
            if (err?.response) 
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

    useEffect(() => 
    {
        const controller = new AbortController();
        getProducts();
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
                    <h1>Add Order</h1>
                    <Toaster
                    position="top-right"
                    reverseOrder={false}
                    />
                    <p className="breadcrumbs">
                        <span><a href={`${baseUrl}/dashboard`}>Home</a></span>
                        <span><i className="mdi mdi-chevron-right"></i><a href={`${baseUrl}/admin/orders`}>Orders</a></span>
                        <span><i className="mdi mdi-chevron-right"></i></span>Add Orders
                    </p>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <div className="ec-cat-list card card-default mb-24px">
                            <div className="card-body">
                                <div className="ec-cat-form">
                                    <form id="catForm" onSubmit={handleSubmit}>
                                        <h4>Customer Information</h4>
                                            <div className="form-group row">
                                                <div className="col-6">
                                                    <label htmlFor="text" className="col-12 col-form-label">Fullname</label> 
                                                    <input name="name" className="form-control here slug-title" type="text" 
                                                    id="fullname"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setFullname(e.target.value)}
                                                    value={fullname}
                                                    placeholder="Enter Fullname" required
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="text" className="col-12 col-form-label">Address</label> 
                                                    <input name="address" className="form-control here slug-title" type="text" 
                                                    id="address"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    value={address}
                                                    placeholder="Enter address" required
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="text" className="col-12 col-form-label">Phone Number</label> 
                                                    <input name="phonenumber" className="form-control here slug-title" type="text" 
                                                    id="phonenumber"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setPhonenumber(e.target.value)}
                                                    value={phonenumber}
                                                    placeholder="Enter phonenumber" required
                                                    />
                                                </div>  
                                                <div className="col-12"><h4>Orders</h4></div>

                                                <div className="col-12">
                                                    <label htmlFor="text" className="col-12 col-form-label">Products</label> 
                                                    <Select
                                                        name="product_id"
                                                        options={productOptions}
                                                        value={productOptions.find(option => option.value === product_id) || null}
                                                        isSearchable={true} 
                                                        onChange={(selectedOption) => setProductId(selectedOption ? selectedOption.value : "")}
                                                        placeholder="Select a Product"
                                                        />
                                                </div>
                                               
                                                <div className="col-6">
                                                    <label htmlFor="text" className="col-12 col-form-label">Total Amount</label> 
                                                    <input name="total_amt" className="form-control here slug-title" type="text" 
                                                    id="total_amt"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setTotalAmt(e.target.value)}
                                                    value={total_amt}
                                                    placeholder="Enter Total Price" required
                                                    />
                                                </div>     
                                                <div className="col-6">
                                                    <label htmlFor="text" className="col-12 col-form-label">Advance</label> 
                                                    <input name="advance" className="form-control here slug-title" type="text" 
                                                    id="advance"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setAdvance(e.target.value)}
                                                    value={advance}
                                                    placeholder="Enter advance" required
                                                    />
                                                </div> 
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <button name="submit" type="submit" className="btn btn-primary">
                                                        {editingId !== null ? "Update" : "Save"}
                                                    </button>
                                                    {editingId !== null && (
                                                        <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
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

export default OrderAdd
