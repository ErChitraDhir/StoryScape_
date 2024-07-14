import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../ApiService";
import { IMAGE_BASE_URL } from "../ApiService"
export default function Home() {
    const [allThemes, setThemes] = useState([])

    const getalldata = () => {
        ApiService.getallTheme({}).then(x => {
            setThemes(x.data.data)
        })
    }

    useEffect(() => {
        getalldata()
    }, [])

    return (
        <>
            <div className="container-fluid bg-primary px-0 px-md-5 mb-5">
                <div className="row align-items-center px-3">
                    <div className="col-lg-6 text-center text-lg-left">
                        <h4 className="text-white mb-4 mt-5 mt-lg-0">Kids Learning Center</h4>
                        <h1 className="display-3 font-weight-bold text-white">
                            New Approach to Kids Education
                        </h1>

                    </div>
                    <div className="col-lg-6 text-center text-lg-right">
                        <img className="img-fluid mt-5" src="dist/img/header.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="container-fluid pt-5">
                <div className="container pb-3">
                    <div className="row">
                        {allThemes?.map((data, index) => (
                            <div className="col-lg-4 col-md-6 pb-1" key={index}>
                                <div
                                    className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                    style={{ padding: "30px" }}
                                >
                                    <Link to={"/story-by-theme/" + data._id}>
                                        <img src={IMAGE_BASE_URL + data.thumbnail} className='img-fluid' style={{ height: "70px", width: "80px" }} /></Link>
                                    <div className="pl-4">
                                        <Link to={"/story-by-theme/" + data._id}>
                                            <h4>{data.themeName}</h4>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}