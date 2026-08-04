import { useRef, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import { Toaster, toast } from "react-hot-toast";
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import useDashboardUI from '../../hooks/useDashboardUI';

const URL = '/orders';

function OrderAdd() 
{
    useDashboardUI();
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
    const [shipping_cost, setShippingCost] = useState('');
    
    const [orderItems, setOrderItems] = useState([
    {
        product_id: "",
        qty: 1,
        price: ""
    }
    ]);

    const addRow = () => {
        setOrderItems([
            ...orderItems,
            {
                product_id: "",
                qty: 1,
                price: ""
            }
        ]);
    };
    const removeRow = (index) => 
    {
        const items = [...orderItems];
        items.splice(index, 1);
        setOrderItems(items);
    };

    const handleItemChange = (index, field, value) => 
    {
        const items = [...orderItems];
        items[index][field] = value;
        setOrderItems(items);
        console.log(items);
    };

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
                JSON.stringify({ fullname,address,phonenumber,total_amt,shipping_cost,advance,items: orderItems }),
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

    useEffect(() => {
        getProducts();
    const total = orderItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        return sum + price;
    }, 0);
    setTotalAmt(total.toFixed(2));
}, [orderItems]);

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
                                            </div>
                                            <div className="col-12"><h4>Orders</h4></div>

                                            {orderItems.map((item, index) => (
                                                <div className="row mb-3" key={index}>
                                                    <div className="col-md-5">
                                                        <label>Product</label>
                                                        <Select
                                                            options={productOptions}
                                                            className="product-select"
                                                              classNamePrefix="react-select"

                                                            value={
                                                                productOptions.find(
                                                                    option => option.value === item.product_id
                                                                ) || null
                                                            }
                                                            onChange={(selected) =>
                                                                handleItemChange(
                                                                    index,
                                                                    "product_id",
                                                                    selected ? selected.value : ""
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-5 col-md-2 pd-0-right">
                                                        <label className='pd-10'>Qty</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={item.qty}
                                                            onChange={(e) =>
                                                                handleItemChange(index, "qty", e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-5 col-md-3 pd-0-right">
                                                        <label className='pd-10'>Price</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={item.price}
                                                            onChange={(e) =>
                                                                handleItemChange(index, "price", e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-2 pd-30 d-flex align-items-end">
                                                        {index === 0 ? (
                                                            <button
                                                                type="button"
                                                                className="btn btn-success"
                                                                onClick={addRow}
                                                            >
                                                                +
                                                            </button>
                                                           
                                                        ) : (
                                                            <button type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => removeRow(index)}
                                                            >
                                                               <i className="mdi mdi-delete"></i>
                                                            </button>
                                                        )}

                                                    </div>

                                                </div>
                                            ))}
                                            <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="text" className="col-12 col-form-label">Total Amount</label> 
                                                    <input name="total_amt" className="form-control here slug-title" type="text" 
                                                    id="total_amt"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setTotalAmt(e.target.value)}
                                                    value={total_amt}
                                                    placeholder="Total Price" readOnly="readonly" 
                                                    />
                                                </div>    
                                                <div className="col-6">
                                                    <label htmlFor="text" className="col-12 col-form-label">Delivery Charge</label> 
                                                    <input name="shipping_cost" className="form-control here slug-title" type="text" 
                                                    id="shipping_cost"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => setShippingCost(e.target.value)}
                                                    value={shipping_cost}
                                                    placeholder="Delivery Charge"
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
                                                    <button name="submit" type="submit" className="mt-20 btn btn-primary">
                                                        {editingId !== null ? "Update" : "Save"}
                                                    </button>
                                                    {editingId !== null && (
                                                        <button type="button" className="mt-20 btn btn-secondary ms-2" onClick={resetForm}>
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
