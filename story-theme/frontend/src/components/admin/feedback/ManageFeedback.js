import { useEffect, useState } from "react";
import ApiService from "../../../ApiService";

export default function ManageFeedback() {
    const [allFeedbacks, setFeedbacks] = useState([])

    const getalldata = () => {
        ApiService.getallFeedback({}).then(x => {
            setFeedbacks(x.data.data)
        })
    }
   
    useEffect(() => {
        getalldata()
    }, [])

    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white">Manage Feedbacks</h3>
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
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th style={{ width: "150px" }}>Rating</th>
                                        <th>Feedback</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allFeedbacks?.map((data, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>                                    {data.rating == 1 ? <><i className="fa fa-star text-warning text-shadow"></i></> : ''}
                                                {data.rating == 2 ? <><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i></> : ''}
                                                {data.rating == 3 ? <><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i></> : ''}
                                                {data.rating == 4 ? <><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i></> : ''}
                                                {data.rating == 5 ? <><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i><i className="fa fa-star text-warning text-shadow"></i></> : ''}
                                                       
                                            </td>
                                         
                                            <td>{data.feedback}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}