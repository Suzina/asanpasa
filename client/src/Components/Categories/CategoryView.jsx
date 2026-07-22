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
                        <div className="row">
                                <div className="col-xl-8 col-lg-12">
                                    <div className="ec-cat-list card card-default">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table id="responsive-data-table" className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Thumb :</th>
                                                            <th><img className="cat-thumb" src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg" alt="{category.name}" /></th>
                                                        </tr>
                                                        <tr>
                                                            <th>Name :</th>
                                                            <th>{category.name} </th>
                                                        </tr>
                                                    </thead>
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

export default CategoryView
