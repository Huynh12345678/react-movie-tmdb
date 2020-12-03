import { useState, useEffect } from 'react'
import axios from 'axios'
import './movie-detail-info.styles.scss'
import { useParams } from 'react-router-dom'
import { API_KEY, API_URL } from '../../config/config'

const MovieDetailInfo = () => {

    const [state, setState] = useState({
        item: []
    })

    const { id } = useParams();

    const hours = (runtime) => {
        const hours = Math.floor(runtime / 60);
        const mins = runtime % 60;
        return `${hours}h ${mins}m`;
    }

    useEffect(() => {
        const getDetail = async () => {
            try {
                const response = await axios(`${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`)

                setState({
                    item: response.data
                })
            } catch (err) {
                console.log(err);
            }
        }
        getDetail();
    }, [])

    return <>
        <div className="movie__detail-info">
            <div className="row">
                <div className="col-md-4">
                    <p>
                        Runtime: {hours(state.item.runtime)}
                    </p>
                </div>

                <div className="col-md-4">
                    <p>
                        Budget: {state.item.budget}
                    </p>
                </div>

                <div className="col-md-4">
                    <p>
                        Revenue: {state.item.revenue}
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default MovieDetailInfo;