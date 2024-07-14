import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ApiService from "../ApiService"
import {IMAGE_BASE_URL} from "../ApiService"


export default function SingleStory() {
    const param = useParams()
    const [themeId, setThemeId] = useState()
    const [storyTitle, setStoryTitle] = useState()
    const [description, setDescription] = useState()
    const [storyWriter, setStoryWriter] = useState()
    const [thumbnail, setThemeThumbnail] = useState()

    const getsingledata = () => {
        ApiService.getSingleStory({ '_id': param.id }).then(x => {
            setThemeId(x.data.data.themeId.themeName)
            setStoryTitle(x.data.data.storyTitle)
            setDescription(x.data.data.description)
            setStoryWriter(x.data.data.storyWriter)
            setThemeThumbnail(x.data.data.thumbnail)
        })
    }

    useEffect(() => {
        getsingledata()
    }, [])
    return (
        <>
            <div className="container-fluid bg-primary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "400px" }}>
                    <h3 className="display-3 font-weight-bold text-white">{storyTitle}</h3>
                </div>
            </div>
            <div class="container py-5">
                <div class="row pt-5">
                    <div class="col-lg-10 mx-auto">
                        <div class="d-flex flex-column text-left mb-3">
                            <p class="section-title pr-5">
                                <span class="pr-2">{themeId}</span>
                            </p>
                            <h1 class="mb-3">{storyTitle}</h1>
                            <div class="d-flex">
                                <p class="mr-3"><i class="fa fa-user text-primary"></i> {storyWriter}</p>
                            </div>
                        </div>
                        <div class="mb-5">
                            <img
                                class="img-fluid rounded w-100 mb-4"
                                src={IMAGE_BASE_URL + thumbnail}
                                alt="Image" style={{height:"400px"}}
                            />
                            <p className="text-justify">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}