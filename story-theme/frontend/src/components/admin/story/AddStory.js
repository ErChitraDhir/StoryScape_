import { useEffect, useState } from "react"
import ApiService from "../../../ApiService"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddStory() {
    const [allThemes, setThemes] = useState([])

    const [themeId, setThemeId] = useState()
    const [storyTitle, setStoryTitle] = useState()
    const [description, setDescription] = useState()
    const [storyWriter, setStoryWriter] = useState()
    const [thumbnail, setThemeThumbnail] = useState()

    const nav = useNavigate()
    const submitform = (e) => {
        e.preventDefault()
        // console.log(themeId)
        let formData = new FormData()
        formData.append('themeId', themeId)
        formData.append('storyTitle', storyTitle)
        formData.append('description', description)
        formData.append('storyWriter', storyWriter)
        formData.append('thumbnail', thumbnail)

        ApiService.addStory(formData).then(
            (x) => {
                if (x.data.success) {
                    toast.success(x.data.message)
                    setTimeout(() => {
                        nav("/managestory")
                    }, 2000);
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
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white">Add Story</h3>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mb-5 mx-auto">
                            <div className="contact-form">
                                <form onSubmit={submitform}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Theme Name</label>
                                                <select
                                                    className="form-control"
                                                    placeholder="Theme Name"
                                                    required="required" onChange={(e) => { setThemeId(e.target.value) }}>
                                                    <option value={""} selected disabled>Select Theme</option>
                                                    {allThemes?.map((themedata, index) => (
                                                        <option key={index} value={themedata._id}>{themedata.themeName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Story Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Story Title"
                                                    required="required" onChange={(e) => { setStoryTitle(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Thumbnail</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    required="required" onChange={(e) => { setThemeThumbnail(e.target.files[0]) }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Story Writer</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Story Writer"
                                                    required="required" onChange={(e) => { setStoryWriter(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Theme Description</label>
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Theme Description"
                                                    required="required" onChange={(e) => { setDescription(e.target.value) }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            className="btn btn-primary py-2 px-4"
                                            type="submit"
                                            id="sendMessageButton"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}