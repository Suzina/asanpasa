import { useRef, useState, useEffect } from 'react';
import Sidebar from '../Layouts/Sidebar';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { Toaster, toast } from "react-hot-toast";
import { axiosPrivate } from '../../api/axios';
import { useNavigate, useParams} from 'react-router-dom';
import Select from 'react-select';
import useDashboardUI from '../../hooks/useDashboardUI';
import { NepaliDatePicker, adToBs } from "@himal_bhattarai/nepali-datepicker";



const URL = '/orders';

function OrderAdd() 
{
    useDashboardUI();
    const userRef = useRef();
    const errRef = useRef();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const { id } = useParams();
    const [editingId, setEditingId] = useState(null);
    const [products, setProducts] = useState([]);
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [total_amt, setTotalAmt] = useState('');
    const [advance, setAdvance] = useState('');
    const [shipping_cost, setShippingCost] = useState('');
    const [fulldelivery_date, setDeliveryDate] = useState('');
    const [status, setStatus] = useState('');

    const getOrder = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get(`/orders/${id}`, { signal });
            const data = response.data;
            setFullname(data.fullname);
            setAddress(data.address);
            setPhonenumber(data.phonenumber);
            setTotalAmt(data.total_amt);
            setAdvance(data.advance);
            setShippingCost(data.shipping_cost);
           if (data?.delivery_date) 
            {
                const [year, month, day] = data.delivery_date
                .split("-")
                .map(Number);
                setDeliveryDate({
                    year,
                    month,
                    day
                });
            }
            console.log(fulldelivery_date);
            setStatus(data.status);
            if (data.orderItems && data.orderItems.length > 0) 
            {
                setOrderItems(
                    data.orderItems.map((item) => ({
                        product_id: item.product_id,
                        qty: item.quantity,
                        price: item.price,
                        
                    }))
                );
             }

        } 
        catch (err) 
        {
            console.log(err);
        }
    }
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
                const delivery_date=fulldelivery_date.delivery_date;
                response = await axiosPrivate.put(`${URL}/${editingId}`,
                JSON.stringify({ fullname,address,phonenumber,status,total_amt,shipping_cost,advance,delivery_date,items: orderItems }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );
                if (response.data.error) 
                {
                    toast.error(response.data.error)
                } 
                else 
                {
                    toast.success("Order Updated!");
                    navigate('/admin/orders'); 

                }

            }
            else
            {
                const delivery_date=fulldelivery_date.delivery_date;
                response = await axiosPrivate.post(URL,
                JSON.stringify({ fullname,address,phonenumber,status,total_amt,shipping_cost,advance,delivery_date,items: orderItems }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );
                console.log(response.data);
                if (response.data.error) 
                {
                    toast.error(response.data.error);
                    
                } 
                else 
                {
                    toast.success("New Order Added!");
                    navigate('/admin/orders'); 
                }
            }
            
            
        }
        catch (err)
        {
            console.log(err)
    
            if (err.response?.status === 400) {
                toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');
            } else if (err.response?.status === 401) {
                toast.error('Unauthorized');
            } else {
                toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');

            }
        }
    }

    
    useEffect(() => {
        getProducts();
        if (id) {
            setEditingId(id);
            getOrder();
        }
    }, [id]);
    useEffect(() => {
        const total = orderItems.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseFloat(item.qty) || 0;
            return sum + price * qty; // multiply by qty too, see note below
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
                        <span><a href={`${baseUrl}/admin/dashboard`}>Home</a></span>
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
                                                <div className="col-md-4 col-6">
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
                                                <div className="col-md-4 col-6">
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
                                                <div className="col-md-4 col-6">
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
                                                <div className="col-md-4 col-6">
                                                    <label htmlFor="text" className="col-12 col-form-label">Order Status</label> 
                                                    <select value={status} className='product-select' name='status' id="status" onChange={(e) => setStatus(e.target.value)}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </div> 
                                            </div>
                                            <div className="col-12"><h4>Orders</h4></div>

                                            {orderItems.map((item, index) => (
                                                <div className="row mb-3" key={index}>
                                                    <div className="col-4 col-md-5 mb-3">
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

                                                    <div className="col-3 col-md-2 pd-0-right">
                                                        <label className='pd-10'>Qty</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={item.qty ?? ""}
                                                            onChange={(e) =>
                                                                handleItemChange(index, "qty", e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-4 col-md-3 pd-0-right">
                                                        <label className='pd-10'>Price</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                                value={item.price ?? ""}
                                                                    onChange={(e) =>
                                                                handleItemChange(index, "price", e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-1 pd-30 d-flex align-items-end">
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
                                            <div className="row mb-3">
                                                <div className="col-6 col-md-3">
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
                                                <div className="col-6 col-md-3">
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
                                                <div className="col-6 col-md-3">
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
                                                 <div className="col-6 col-md-3">
                                                    <label htmlFor="text" className="col-12 col-form-label">Delivery Date</label> 
                                                    
                                                    <NepaliDatePicker
    value={fulldelivery_date}
    onChange={(bs, ad) => {
        setDeliveryDate(bs);
        setDeliveryDate(prev => ({
            ...prev,
            delivery_date: `${bs.year}-${String(bs.month).padStart(2, "0")}-${String(bs.day).padStart(2, "0")}`
        }));
    }}
    
    styles={{
    primary:     "#b094daff",   // main accent color (header, selected day, etc.)
    primarySoft: "#e8f0fe",   // light tint of primary (hover backgrounds)
    background:  "#ffffff",   // calendar popup and input background
    text:        "#1e293b",   // main text color
    textMuted:   "#94a3b8",   // muted text (day headers, placeholder, AD date)
    border:      "#e2e8f0",   // all borders
    todayBg:     "#dbeafe",   // today's date highlight background
    controlsBg:  "#eff6ff",   // month/year selector bar background
    radius:      "12px",      // border radius of the popup
    shadow:      "0 8px 32px rgba(0,0,0,0.12)",  // popup drop shadow
  }}
/>
                                                </div>
                                            </div>
                                              
                                            <div className="row">
                                                <div className="col-12">
                                                    <button name="submit" type="submit" className="mr-20 btn btn-primary">
                                                        {editingId !== null ? "Update" : "Save"}
                                                    </button>
                                                    {editingId !== null && (
                                                        <a href={`${baseUrl}/admin/orders`} type="button" className="mr-20 btn btn-secondary ms-2">
                                                            Go Back
                                                        </a>
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
