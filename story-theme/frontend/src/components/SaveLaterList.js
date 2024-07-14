import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../ApiService";
import { IMAGE_BASE_URL } from "../ApiService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SaveLaterList() {
    const [allStories, setStories] = useState([])

    const getalldata = () => {
        ApiService.getallSaveLater({userId:localStorage.getItem("_id")}).then(x => {
            // console.log(x.data.data)
            setStories(x.data.data)
        })
    }

    const deleteHandler = (id) => {
        
        let data = {
            _id: id
        }

        ApiService.removeSaveLater(data).then(
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
                    <h3 className="display-3 font-weight-bold text-white text-center">Saved Stories</h3>
                </div>
            </div>

            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="row">
                        {allStories?.map((data, index) => (
                            <div className="col-lg-4 mb-5" key={index}>
                                <div className="card border-0 bg-light shadow-sm pb-2">
                                    <img className="card-img-top mb-2" src={IMAGE_BASE_URL + data?.storyId?.thumbnail} alt="" style={{ height: '250px' }} />
                                    <div className="card-body text-center">
                                        <h4 className="card-title">{data?.storyId?.storyTitle}</h4>
                                        <p className="card-text">
                                            {data?.storyId?.description}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-transparent py-4 px-5">
                                        <div className="row border-bottom">
                                            <div className="col-6 py-1 text-right border-right">
                                                <strong>Written By</strong>
                                            </div>
                                            <div className="col-6 py-1">{data?.storyId?.storyWriter}</div>
                                        </div>
                                        <div className="row border-bottom">
                                            <div className="col-6 py-1 text-right border-right">
                                                <strong>Theme Title</strong>
                                            </div>
                                            <div className="col-6 py-1">{data?.storyId?.themeId?.themeName}</div>
                                        </div>

                                    </div>
                                    {((localStorage.getItem("token") == null) && (index == 0)) ? <Link to={'/singlestory/' + data._id} className="btn btn-primary px-4 mx-auto mb-2">Read Story</Link>
                                        : ((localStorage.getItem("token") != null) ? <Link to={'/singlestory/' + data._id} className="btn btn-primary px-4 mx-auto mb-2">Read Story</Link> : <Link to={'#'} className="btn btn-primary px-4 mx-auto mb-2">Read Story</Link>)}

                                    {(localStorage.getItem("token") == null ? "" : <Link onClick={() => { if (window.confirm('Are you sure to remove this story?')) { deleteHandler(data._id) }; }}  className="btn btn-warning px-4 mx-auto mb-2">Remove</Link> )}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )

}