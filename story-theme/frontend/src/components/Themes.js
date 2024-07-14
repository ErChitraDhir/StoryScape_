import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../ApiService";
import { IMAGE_BASE_URL } from "../ApiService"

export default function Themes() {
    const [allThemes, setThemes] = useState([])
    const [allSearchThemes, setSearchThemes] = useState([])

    const getalldata = () => {
        ApiService.getallTheme({}).then(x => {
            setThemes(x.data.data)
            setSearchThemes(x.data.data)
        })
    }
    
    const searchByTheme = (e) => {
        // console.log(e.target.value)
        ApiService.getallTheme({_id:e.target.value}).then(x => {
            setThemes(x.data.data)
        })
    }

    useEffect(() => {
        getalldata()
    }, [])

    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white">Themes</h3>
                </div>
            </div>

            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="row">

                        <div className="col-md-8 float-end mb-4"></div>
                        <div className="col-md-4 float-end mb-4">
                            <label>Search By Theme</label>
                            <select className="form-control" onChange={searchByTheme}>
                                <option>Select Themes</option>
                                {allSearchThemes?.map((data, index) => (
                                    <option value={data._id} key={index+1}>{data.themeName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row pb-3">
                        {allThemes?.map((data, index) => (
                            <div className="col-lg-4 mb-4" key={index}>
                                <div className="card border-0 shadow-sm mb-2">
                                    <Link to={"/story-by-theme/" + data._id}><img className="card-img-top mb-2" src={IMAGE_BASE_URL + data?.thumbnail} alt="" style={{height:'200px'}} /></Link>
                                    <div className="card-body bg-light text-center p-4">
                                        <Link to={"/story-by-theme/" + data._id}>
                                            <h4 className="">{data.themeName}</h4>
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