import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from "../ApiService";

export default function AddFeedback() {
    const nav = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [rating, setRating] = useState()
    const [feedback, setFeedback] = useState()

    const submitform = (e) => {
        e.preventDefault()

        let data = {
            name: name,
            email: email,
            rating: rating,
            feedback: feedback
        }

        ApiService.addFeedback(data).then(
            (x) => {
                if (x.data.success) {
                    toast.success(x.data.message)
                    setTimeout(() => {
                        setName('')
                        setEmail('')
                        setRating('')
                        setFeedback('')
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
    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white">Add Feedback</h3>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mb-5 mx-auto">
                            <div className="contact-form">
                                <form onSubmit={submitform}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Your name"
                                            required="required"
                                            value={name}
                                            onChange={(e) => { setName(e.target.value) }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Your Email"
                                            required="required"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Rating</label>
                                        <input
                                            type="number" min={1} max={5}
                                            className="form-control"
                                            placeholder="Rating (1-5)"
                                            required="required"
                                            value={rating}
                                            onChange={(e) => { setRating(e.target.value) }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Feedback</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Feedback"
                                            required="required"
                                            value={feedback}
                                            onChange={(e) => { setFeedback(e.target.value) }}
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