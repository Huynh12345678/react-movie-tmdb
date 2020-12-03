import { useState, useEffect } from 'react'
import axios from 'axios'
import './slider.styles.scss'
import { API_KEY, API_URL, IMAGE_URL, BACKDROP_SIZE } from '../../config/config'

const Slider = () => {
    const [slider, setSlider] = useState({
        loading: false,
        listSlider: null
    })

    useEffect(() => {
        const getList = async () => {
            try {
                const result = await axios.get(`${API_URL}movie/popular/?api_key=${API_KEY}&language=en-US&page=1`);

                setSlider({
                    ...slider,
                    listSlider: slider.listSlider || result.data.results[0],
                })

            } catch (err) {
                console.log(err);
            }
        }
        getList();
    }, [])


    return <>
        {
            slider.listSlider ? (
                <section className="slider">
                    <div className="slider__background" style={{ backgroundImage: `url(${IMAGE_URL}${BACKDROP_SIZE}${slider.listSlider.backdrop_path})` }}>
                        <div className="slider__background-body">
                            <h1>{slider.listSlider.title}</h1>
                            <p>{slider.listSlider.overview}</p>
                        </div>
                    </div>
                </section>
            ) : null
        }
    </>
}

export default Slider;