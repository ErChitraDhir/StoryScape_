import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../ApiService";
import { IMAGE_BASE_URL } from "../ApiService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllStories() {
    const [allStories, setStories] = useState([])
    const [allSavedStories, setSavedStories] = useState([])

    const getalldata = () => {
        ApiService.getallStory({}).then(x => {
            setStories(x.data.data)
        })
    }
    const getallsavedata = () => {
        ApiService.getallSaveLater({userId:localStorage.getItem("_id")}).then(x => {
            setSavedStories(x.data.data)
            // console.log(x.data.data)
        })
    }

    function checkInSaved(id){
     let filteredStories=  allSavedStories.filter(x=>  x.storyId._id== id)
    //  console.log("filtered", filteredStories)
        return !!filteredStories && filteredStories.length>0
    }

    const deleteHandler = (id) => {
        
        let data = {
            userId: localStorage.getItem("_id"),
            storyId: id
        }

        ApiService.addSaveLater(data).then(
            (x) => {
                if (x.data.success) {
                    toast.success(x.data.message)
                    getalldata()
                    getallsavedata()
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

    const removeHandler = (id) => {
        
        let data = {
            userId: localStorage.getItem("_id"),
            storyId: id
        }

        ApiService.removeSaveLaterAnother(data).then(
            (x) => {
                if (x.data.success) {
                    toast.success(x.data.message)
                    getalldata()
                    getallsavedata()
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
        getallsavedata()
    }, [])

    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white text-center">Stories</h3>
                </div>
            </div>

            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="row">

                        
                        {allStories?.map((data, index) => (
                            <div className="col-lg-4 mb-5" key={index}>
                                <div className="card border-0 bg-light shadow-sm pb-2">
                                    <img className="card-img-top mb-2" src={IMAGE_BASE_URL + data?.thumbnail} alt="" style={{ height: '250px' }} />
                                    <div className="card-body text-center">
                                        <h4 className="card-title">{data?.storyTitle}</h4>
                                        <p className="card-text">
                                            {data?.description}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-transparent py-4 px-5">
                                        <div className="row border-bottom">
                                            <div className="col-6 py-1 text-right border-right">
                                                <strong>Written By</strong>
                                            </div>
                                            <div className="col-6 py-1">{data?.storyWriter}</div>
                                        </div>
                                        <div className="row border-bottom">
                                            <div className="col-6 py-1 text-right border-right">
                                                <strong>Theme Title</strong>
                                            </div>
                                            <div className="col-6 py-1">{data?.themeId?.themeName}</div>
                                        </div>

                                    </div>
                                    {((localStorage.getItem("token") == null) && (index == 0)) ? <Link to={'/singlestory/' + data._id} className="btn btn-primary px-4 mx-auto mb-2">Read Story</Link>
                                        : ((localStorage.getItem("token") != null) ? <Link to={'/singlestory/' + data._id} className="btn btn-primary px-4 mx-auto mb-2">Read Story</Link> : <Link to={'#'} className="btn btn-primary px-4 mx-auto mb-2">Read Story</Link>)}

                                    {(localStorage.getItem("token") == null ? "" : !checkInSaved(data._id)? <Link onClick={() => { if (window.confirm('Are you sure to save this story?')) { deleteHandler(data._id) }; }}  className="btn btn-warning px-4 mx-auto mb-2">Save For Later</Link> :<>
                                    <Link onClick={() => { if (window.confirm('Are you sure to remove this story?')) { removeHandler(data._id) }; }}  className="btn btn-warning px-4 mx-auto mb-2">Remove</Link></>)}

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