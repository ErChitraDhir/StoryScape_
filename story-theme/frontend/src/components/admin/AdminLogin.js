import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../ApiService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {

    const [email, setEmail] = useState()
    const [pass, setPass] = useState()

    const nav = useNavigate()
    const login = (e) => {
        e.preventDefault()
        let data = {
            email: email,
            password: pass,
        }
        ApiService.login(data).then(
            (x) => {
                if (x.data.success) {
                    localStorage.setItem("token", x.data.token)
                    localStorage.setItem("_id", x.data.data._id)
                    localStorage.setItem("userType", x.data.data.userType)
                    toast.success(x.data.message)
                    setTimeout(() => {
                        nav("/dashboard")
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
                    <h3 className="display-3 font-weight-bold text-white">Admin Login</h3>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mb-5 mx-auto">
                            <div className="contact-form">
                                <form onSubmit={login}>
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
                                            onChange={(e) => { setPass(e.target.value) }}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary py-2 px-4"
                                            type="submit">
                                            Login
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