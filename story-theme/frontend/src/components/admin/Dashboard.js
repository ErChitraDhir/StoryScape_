import { useEffect, useState } from "react"
import ApiService from "../../ApiService"

export default function Dashboard() {
    const [totalThemes,setThemes] = useState()
    const [totalStories,setStories] = useState()
    const [totalReaders,setReaders] = useState()

    const getDashboard = ()=>{
        ApiService.dashboard({}).then(x=>{
            setThemes(x.data.total_themes)
            setStories(x.data.total_stories)
            setReaders(x.data.total_readers)
        })
    }
    useEffect(()=>{
        getDashboard()
    },[])
    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white">Dashboard</h3>
                </div>
            </div>
            <div className="container-fluid py-5">
                <div className="container">
                <div className="row">
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: "30px" }}
                            >
                                <i
                                    className="flaticon-050-fence h1 font-weight-normal text-primary mb-3"
                                ></i>
                                <div className="pl-4">
                                    <h4>Total Themes</h4>
                                    <p className="m-0">{totalThemes}                      
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: "30px" }}
                            >
                                <i
                                    className="flaticon-050-fence h1 font-weight-normal text-primary mb-3"
                                ></i>
                                <div className="pl-4">
                                    <h4>Total Stories</h4>
                                    <p className="m-0">
                                        {totalStories}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pb-1">
                            <div
                                className="d-flex bg-light shadow-sm border-top rounded mb-4"
                                style={{ padding: "30px" }}
                            >
                                <i
                                    className="flaticon-050-fence h1 font-weight-normal text-primary mb-3"
                                ></i>
                                <div className="pl-4">
                                    <h4>Total Readers</h4>
                                    <p className="m-0">
                                     {totalReaders}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}