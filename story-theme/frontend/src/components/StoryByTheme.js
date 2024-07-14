import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../ApiService";
import { IMAGE_BASE_URL } from "../ApiService"

export default function StoryByTheme() {
    const [allStories, setStories] = useState([])
    const [themeName, setThemeName] = useState([])

    const params = useParams()

    const getalldata = () => {
        let data = {
            themeId: params.theme
        }
        ApiService.getallStory(data).then(x => {
            setStories(x.data.data)
        })
    }

    const getsingletheme = () => {
        let data = {
            _id: params.theme
        }
        ApiService.getSingleTheme(data).then(x => {
            setThemeName(x.data.data.themeName)
        })
    }

    useEffect(() => {
        getalldata()
        getsingletheme()
    }, [])
    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white text-center">Story on <br /> <i>{themeName}</i></h3>
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
                                    {((localStorage.getItem("token") == null) && (index == 0)) ? <Link to={'/singlestory/' + data._id} className="btn btn-primary px-4 mx-auto mb-4">Read Story</Link>
                                        : ((localStorage.getItem("token") != null) ? <Link to={'/singlestory/' + data._id} className="btn btn-primary px-4 mx-auto mb-4">Read Story</Link> : <Link to={'#'} className="btn btn-primary px-4 mx-auto mb-4">Read Story</Link>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}