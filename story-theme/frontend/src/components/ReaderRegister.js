import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from "../ApiService";

export default function ReaderRegister() {
    const nav = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [contact, setContact] = useState()
    const [address, setAddress] = useState()

    const register = (e) => {
            e.preventDefault()

            let data = {
                name: name,
                email: email,
                password: password,
                contact: contact,
                address: address,
            }

            ApiService.addReader(data).then(
                (x) => {
                    if (x.data.success) {
                        toast.success(x.data.message)
                        setTimeout(() => {
                            nav("/readerlogin")
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
                    <h3 className="display-3 font-weight-bold text-white">Reader Register</h3>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mb-5 mx-auto">
                            <div className="contact-form">
                                <form onSubmit={register}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Your name"
                                            required="required"
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
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Your Password"
                                            required="required"
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Contact</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Your Contact"
                                            required="required"
                                            onChange={(e) => { setContact(e.target.value) }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Address"
                                            required="required"
                                            onChange={(e) => { setAddress(e.target.value) }}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary py-2 px-4"
                                            type="submit"
                                        >
                                            Register
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