import { useRef, useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import Sidebar from '../Layouts/Sidebar';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { axiosPrivate } from '../../api/axios';
import useDashboardUI from '../../hooks/useDashboardUI';
import { validateExpenseForm } from  "../../Utils/validateForm";
import Select from 'react-select';
import { NepaliDatePicker, adToBs } from "@himal_bhattarai/nepali-datepicker";

const URL = '/expenses';

function Expenses() {

    useDashboardUI();
    const userRef = useRef();
    const errRef = useRef();
    const [name, setName] = useState('');
    const [expenses, setExpenses] = useState([]);
    
    const [editingId, setEditingId] = useState(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [errors, setErrors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;
    const [isSearching, setIsSearching] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedRawMaterial, setSelectedRawMaterial] = useState(null);

    const [vendors, setVendors] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    const [qty, setQty] = useState('');
    const [amount, setAmount] = useState('');
    const [payment_status, setPaymentStatus] = useState('');
    const [payment_date, setPaymentDate] = useState('');

    const getExpenses = async (page = 1, signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get(URL, {
                params: { page, limit: itemsPerPage },
                signal,
            });
            setExpenses(response.data.items);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
            setCurrentPage(response.data.currentPage);
        } 
        catch (err) 
        {
            console.log(err);
        }
    }

    const resetForm = () => {
        setSelectedVendor(null);
        setSelectedRawMaterial(null);
        setQty('');
        setAmount('');
        setPaymentStatus('Unpaid');
        setPaymentDate('');
        setEditingId(null);
        setErrors({});
    };

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        getExpenses(page);
    };

    const handleSubmit= async (e) =>
    {
        console.log("Data form with data:", { selectedVendor, selectedRawMaterial, qty, amount, payment_status, payment_date });
        e.preventDefault();
        console.log("After Prevent Default form with data:", { selectedVendor, selectedRawMaterial, qty, amount, payment_status, payment_date });

        /*const validationErrors = validateExpenseForm({ 
            selectedVendor, 
            selectedRawMaterial, 
            qty, 
            amount, 
            payment_status, 
            payment_date
         });
        if (Object.keys(validationErrors).length > 0) 
        {
            setErrors(validationErrors);
            return;
        }*/
        console.log("after error form with data:", { selectedVendor, selectedRawMaterial, qty, amount, payment_status, payment_date });

        setErrors({});
        try
        {
            const payload = {
                vendor_id: selectedVendor.value,
                raw_material_id: selectedRawMaterial.value,
                qty,
                amount,
                payment_status: payment_status || 'Unpaid',
                payment_date: payment_date || null,
            };
            console.log("Submitting form with data:", payload);
            let response;

            if (editingId !== null) 
            {
                console.log("Updating form with data:", payload);
                response = await axiosPrivate.put(`${URL}/${editingId}`,
                    JSON.stringify(payload),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
 
                if (response.data.error) 
                {
                    toast.success(response.data.error)
                } else {
                    toast.success("Expense Updated!");
                    setExpenses(prev =>
                        prev.map(expense =>
                            expense.id === editingId ? { ...expense, ...response.data } : expense
                        )
                    );
                    resetForm();
                }

            }
            else
            {
                console.log("Inserting form with data:", payload);
                response = await axiosPrivate.post(URL,
                JSON.stringify(payload),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );
                
                if (response.data.error) 
                {
                    toast.error(response.data.error);
                } 
                else 
                {
                    
                    toast.success("New Expense Added!");
                    setExpenses(prev => [ response.data,...prev]); 
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
                toast.error('Missing Name');
            } else if (err.response?.status === 401) {
                toast.error('Unauthorized');
            } else {
                toast.error(err.response?.data?.error || err.response?.data?.message || 'Something went wrong');

            }
            errRef.current.focus();
        }
                    console.log("after form with data:", { selectedVendor, selectedRawMaterial, qty, amount, payment_status, payment_date });

    }

    const handleEditClick = (category) => 
    {
        setName(category.name);
        setEditingId(category.id);
        userRef.current?.focus();
    }

    const handleDeleteClick = async (id) => {
        try 
        {
            await axiosPrivate.delete(`${URL}/${id}`, { withCredentials: true });
            setExpenses(prev => prev.filter(expense => expense.id !== id));
            if (editingId === id) resetForm();
            toast.success("Expense deleted successfully")
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
    
    const getVendors = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get('/vendors', { signal });
            setVendors(response.data);
        } 
        catch (err) 
        {
            console.log(err);
        }
    }
    const getRawMaterials = async (signal) => 
    {
        try 
        {
            const response = await axiosPrivate.get('/raw-materials', { signal });
            setRawMaterials(response.data);
        } 
        catch (err) 
        {
            console.log(err);
        }
    }

    const vendorOptions = vendors.map(vendor => ({
        value: vendor.id,
        label: vendor.name
    }));
    const rawMaterialOptions = rawMaterials.map(rawMaterial => ({
        value: rawMaterial.id,
        label: rawMaterial.name
    }));
    useEffect(() => 
    {
        const controller = new AbortController();
        getExpenses();
        getVendors();
        getRawMaterials();
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
                    <h1>Expenses</h1>
                       <Toaster
                    position="top-right"
                    reverseOrder={false}
                    />
                    <p className="breadcrumbs"><span><a href={`${baseUrl}/admin/dashboard`}>Home</a></span>
                    <span><i className="mdi mdi-chevron-right"></i></span>Expenses</p>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <div className="ec-cat-list card card-default mb-24px">
                            <div className="card-body">
                                <div className="ec-cat-form">
                                    <h4>{editingId !== null ? "Edit Expense" : "Add Expense"}</h4>
                                    <form id="catForm" onSubmit={handleSubmit}>
                                        <div className="row mb-2">
                                            <div className="col-md-4 col-12">
                                                <label htmlFor="text" className="col-12 col-form-label">Vendors</label> 
                                                <Select
                                                    options={vendorOptions}
                                                    className="product-select"
                                                    classNamePrefix="react-select"
                                                    value={selectedVendor}
                                                    onChange={setSelectedVendor}
                                                    placeholder="Select a vendor..."
                                                    isClearable
                                                    isSearchable
                                                />
                                                 {errors.selectedVendor && (
                                                    <div className="text-danger">
                                                        {errors.selectedVendor}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <label htmlFor="text" className="col-12 col-form-label">Raw Materials</label>
                                                <Select
                                                    options={rawMaterialOptions}
                                                    className="product-select"
                                                    classNamePrefix="react-select"
                                                    value={selectedRawMaterial}
                                                    onChange={setSelectedRawMaterial}
                                                    placeholder="Select raw material..."
                                                    isClearable
                                                    isSearchable
                                                />
                                                 {errors.selectedRawMaterial && (
                                                    <div className="text-danger">
                                                        {errors.selectedRawMaterial}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <label htmlFor="text" className="col-12 col-form-label">Quantity</label>
                                                <input name="name" 
                                                    className={`form-control ${
                                                        errors.qty ? "is-invalid" : ""
                                                    }`}
                                                    type="number" 
                                                    placeholder="Enter quantity"
                                                    id="qty"
                                                    ref={userRef}
                                                    autoComplete="off"
                                                    onChange={(e) => {
                                                        setQty(e.target.value);
                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            qty: ""
                                                        }));
                                                    }}
                                                    value={qty}
                                                />
                                                {errors.qty && (
                                                    <div className="text-danger">
                                                        {errors.qty}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 col-12">
                                                    <label htmlFor="text" className="col-12 col-form-label">Amount</label> 
                                                    <input name="amount" 
                                                        className={`form-control ${
                                                            errors.amount ? "is-invalid" : ""
                                                        }`}
                                                        type="number" 
                                                        id="amount"
                                                        ref={userRef}
                                                        autoComplete="off"
                                                        onChange={(e) => {
                                                            setAmount(e.target.value);
                                                            setErrors((prev) => ({
                                                                ...prev,
                                                                amount: ""
                                                            }));
                                                        }}
                                                        value={amount}
                                                    />
                                                    {errors.amount && (
                                                        <div className="text-danger">
                                                            {errors.amount}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-md-4 col-12">
                                                    <label htmlFor="text" className="col-12 col-form-label">Order Status</label> 
                                                    <select value={payment_status}  className={`product-select ${
                                                                errors.payment_status ? "is-invalid" : ""
                                                            }`} name='payment_status' id="payment_status" onChange={(e) => setPaymentStatus(e.target.value)}>
                                                        <option value="Unpaid">Unpaid</option>
                                                        <option value="Paid">Paid</option>
                                                    </select>
                                                    {errors.status && (
                                                        <div className="text-danger">
                                                            {errors.payment_status}
                                                        </div>
                                                    )}
                                                </div> 
                                                <div className="col-md-4 col-12">
                                                    <label htmlFor="text" className="col-12 col-form-label">Payment Date</label> 
                                                   <NepaliDatePicker
                                                        value={payment_date}
                                                        onChange={(bs, ad) => 
                                                        {
                                                            setPaymentDate(bs);
                                                            setPaymentDate(prev => ({
                                                                ...prev,
                                                                payment_date: `${bs.year}-${String(bs.month).padStart(2, "0")}-${String(bs.day).padStart(2, "0")}`
                                                            }));
                                                            setErrors((prev) => ({
                                                            ...prev,
                                                            payment_date: ""
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
                                                    {errors.payment_date && (
                                                        <div className="text-danger">
                                                            {errors.payment_date}
                                                        </div>
                                                    )}
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 mt-3">
                                                <button name="submit" type="submit" className="btn btn-primary">
                                                    {editingId !== null ? "Update" : "Submit"}
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
                        <div className="col-xl-12 col-lg-12">
                            <div className="ec-cat-list card card-default">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table id="responsive-data-table" className="table">
                                            <thead>
                                                <tr>
                                                    <th>Thumb</th>
                                                    <th>Vendor</th>
                                                    <th>Raw Material</th>
                                                    <th>Quantity</th>
                                                    <th>Amount</th>
                                                    <th>Payment Status</th>
                                                    <th>Payment Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {expenses.map((expense) => (
                                                    <tr key={expense.id}>
                                                        <td><img className="cat-thumb" src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg" alt="{expense.name}" /></td>
                                                        <td>{expense.vendor.name}</td>
                                                        <td>{expense.rawMaterial.name}</td>
                                                        <td>{expense.qty}</td>
                                                        <td>{expense.amount}</td>
                                                        <td>{expense.payment_status}</td>
                                                        <td>{expense.payment_date}</td>
                                                         <td>
                                                            <div className="btn-group">
                                                                <button type="button"
                                                                    className="btn btn-outline-success">View
                                                                </button>
                                                                <button type="button"
                                                                    className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                                                                    data-bs-toggle="dropdown" aria-haspopup="true"
                                                                    aria-expanded="false" data-display="static">
                                                                    <span className="sr-only">Info</span>
                                                                </button>

                                                                <div className="dropdown-menu">
                                                                    <a className="dropdown-item" href={`${baseUrl}/admin/expenses/${expense.id}`}>View</a>
                                                                    <a className="dropdown-item" href={`${baseUrl}/admin/expenses/edit/${expense.id}`}>Edit</a>
                                                                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleDeleteClick(expense.id); }}>Delete</a>															
                                                                </div>
                                                             </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                     {totalPages > 1 && (
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span>
                                            Showing page {currentPage} of {totalPages} ({totalItems} total orders)
                                        </span>
                                        <nav>
                                            <ul className="pagination mb-0">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => goToPage(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Prev
                                                    </button>
                                                </li>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                    <li
                                                        key={page}
                                                        className={`page-item ${page === currentPage ? 'active' : ''}`}
                                                    >
                                                        <button className="page-link" onClick={() => goToPage(page)}>
                                                            {page}
                                                        </button>
                                                    </li>
                                                ))}

                                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => goToPage(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                )}
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

export default Expenses;
