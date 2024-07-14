import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const nav = useNavigate()

    const adminlogout = () => {
        localStorage.clear()
        nav('/admin')
    }
    const logout = () => {
        localStorage.clear()
        nav('/readerlogin')
    }
    return (
        <>
            <div className="container-fluid bg-light position-relative shadow">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5">
                    <a href="" className="navbar-brand font-weight-bold text-secondary" style={{ fontSize: "50px" }}>
                        <i className="flaticon-043-teddy-bear"></i>
                        <span className="text-primary">Story Scape</span>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        {localStorage.getItem('userType') == 'Admin' ?
                            <div className="navbar-nav font-weight-bold mx-auto py-0">
                                <Link to={'/dashboard'} className="nav-item nav-link">Dashboard</Link>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Themes</a>
                                    <div className="dropdown-menu rounded-0 m-0">
                                        <Link to={'/addtheme'} className="dropdown-item">Add Theme</Link>
                                        <Link to={'/managetheme'} className="dropdown-item">Manage Theme</Link>
                                    </div>
                                </div>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Stories</a>
                                    <div className="dropdown-menu rounded-0 m-0">
                                        <Link to={'/addstory'} className="dropdown-item">Add Story</Link>
                                        <Link to={'/managestory'} className="dropdown-item">Manage Story</Link>
                                    </div>
                                </div>
                                <Link to={'/managefeedback'} className="nav-item nav-link">Feedback</Link>
                                <Link to={'/managereader'} className="nav-item nav-link">Readers</Link>
                                <a className="nav-item nav-link" onClick={adminlogout}>Logout</a>
                            </div>
                            : ''}

                        {localStorage.getItem('userType') == 'Reader' ?
                            <div className="navbar-nav font-weight-bold mx-auto py-0">
                                <Link to={'/'} className="nav-item nav-link">Home</Link>
                                <Link to={'/themes'} className="nav-item nav-link">Themes</Link>
                                <Link to={'/all-stories'} className="nav-item nav-link">Stories</Link>
                                <Link to={'/addfeedback'} className="nav-item nav-link">Feedback</Link>
                                <Link to={'/savelater-list'} className="nav-item nav-link">Saved Stories</Link>
                                <a className="nav-item nav-link" onClick={logout}>Logout</a>
                            </div>
                            : ''}

                        {localStorage.getItem('userType') == null ?
                            <div className="navbar-nav font-weight-bold mx-auto py-0">
                                <Link to={'/'} className="nav-item nav-link">Home</Link>
                                <Link to={'/themes'} className="nav-item nav-link">Themes</Link>
                                <Link to={'/all-stories'} className="nav-item nav-link">Stories</Link>
                                <Link to={'/readerregister'} className="nav-item nav-link">Register</Link>
                                <Link to={'/readerlogin'} className="nav-item nav-link">Login</Link>
                            </div>
                            : ''}

                    </div>
                </nav>
            </div>
        </>
    )
}