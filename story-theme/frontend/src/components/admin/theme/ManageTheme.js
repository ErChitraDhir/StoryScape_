import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../../ApiService";
import { IMAGE_BASE_URL } from "../../../ApiService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageTheme() {
    const [allThemes, setThemes] = useState([])

    const getalldata = () => {
        ApiService.getallTheme({}).then(x => {
            setThemes(x.data.data)
        })
    }

    const deleteHandler = (id) => {
        let data = {
            _id: id
        }
        ApiService.deleteTheme(data).then(
            (x) => {
                if (x.data.success) {
                    toast.success(x.data.message)
                    getalldata()
                }
                else {
                    toast.error(x.data.message)
                }
            }
        ).catch(
            (error) => {
                toast.error("Something went wrong!! try again later")
            }
        )
    }

    useEffect(() => {
        getalldata()
    }, [])

    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white">Manage Theme</h3>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 mb-5 mx-auto table-responsive">
                            <table className="table table-bordered">
                                <thead className="table-info">
                                    <tr>
                                        <th>#</th>
                                        <th>Theme Name</th>
                                        <th style={{ width: "150px" }}>Thumbnail</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allThemes?.map((data, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{data.themeName}</td>
                                            <td><img src={IMAGE_BASE_URL + data.thumbnail} className='img-thumbnail' style={{ height: "100px", width: "150px" }} /></td>
                                            <td>
                                                <Link to={'/edittheme/' + data._id}><i className="fa fa-edit fa-2x text-success"></i></Link> &nbsp;
                                                <i className="fa fa-trash fa-2x text-danger" onClick={() => { if (window.confirm('Are you sure to delete this record?')) { deleteHandler(data._id) }; }}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}