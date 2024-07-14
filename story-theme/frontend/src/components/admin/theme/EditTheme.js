import { useEffect, useState } from "react"
import ApiService from "../../../ApiService"
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditTheme() {
    const [themeName, setThemeName] = useState()
    const [themeThumbnail, setThemeThumbnail] = useState()
    const param = useParams()

    const getsingledata = () => {
        ApiService.getSingleTheme({ '_id': param.id }).then(x => {
            setThemeName(x.data.data.themeName)
        })
    }

    const nav = useNavigate()
    const submitform = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append('_id', param.id)
        formData.append('themeName', themeName)
        formData.append('thumbnail', themeThumbnail)

        ApiService.updateTheme(formData).then(
            (x) => {
                if (x.data.success) {
                    toast.success(x.data.message)
                    setTimeout(() => {
                        nav("/managetheme")
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

    useEffect(() => {
        getsingledata()
    }, [])

    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white">Edit Theme</h3>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mb-5 mx-auto">
                            <div className="contact-form">
                                <form onSubmit={submitform}>
                                    <div className="form-group">
                                        <label>Theme Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Theme Name"
                                            required="required" value={themeName}
                                            onChange={(e) => { setThemeName(e.target.value) }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Thumbnail</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => { setThemeThumbnail(e.target.files[0]) }}
                                        />
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