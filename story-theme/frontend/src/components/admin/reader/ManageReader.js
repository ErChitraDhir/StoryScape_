import { useEffect, useState } from "react";
import ApiService from "../../../ApiService";

export default function ManageReader() {
    const [allReaders, setReaders] = useState([])

    const getalldata = () => {
        let data = { 'userType': 'Reader' }
        ApiService.getallReader(data).then(x => {
            setReaders(x.data.data)
        })
    }
    useEffect(() => {
        getalldata()
    }, [])
    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white">Manage Readers</h3>
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
                                        <th>Contact</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allReaders?.map((data, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.contact}</td>
                                            <td>{data.address}</td>
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