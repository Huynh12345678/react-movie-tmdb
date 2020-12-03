import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { API_KEY, API_URL, IMAGE_URL, BACKDROP_SIZE } from '../../config/config'
import './movie-detail.styles.scss'
import MovieDetailGenres from '../movie-detail-genre/movie-detail-genre.component'
import MovieDetailActor from '../movie-detail-actor/movie-detail-actor.component'
import MovieDetailInfo from '../movie-detail-info/movie-detail-info.component'

const MovieDetail = () => {

    const [state, setState] = useState({
        item: []
    })

    const { id } = useParams();

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
    }, [id])

    return <>
        <section className="movie">
            <div className="movie__detail">
                <ul className="movie__detail-breadcrumb m-0 d-flex">
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>

                    <li>
                        /
                    </li>

                    <li>
                        {state.item.title}
                    </li>
                </ul>

                <div className="movie__detail-background" style={{ backgroundImage: `url(${IMAGE_URL}${BACKDROP_SIZE}${state.item.backdrop_path})` }}>
                    <div className="movie__detail-background-item">
                        <div className="row">
                            <div className="col-md-3 d-md-block d-none">
                                <img src={`${IMAGE_URL}${BACKDROP_SIZE}${state.item.poster_path}`} className="img-fluid" alt={state.item.title} />
                            </div>

                            <div className="col-md-9">
                                <div className="movie__detail-background-text">
                                    <h1 className="title">
                                        {state.item.title}
                                    </h1>

                                    <div className="description">
                                        <p>
                                            {state.item.overview}
                                        </p>
                                    </div>

                                    <div className="genres">
                                        <h3 className="text-uppercase mb-3">Genres</h3>

                                        <MovieDetailGenres />
                                    </div>

                                    <div className="status">
                                        <h3 className="text-uppercase mb-3">Status</h3>

                                        <p>{state.item.status}</p>
                                    </div>

                                    <div className="vote">
                                        <h3 className="text-uppercase mb-3">Vote Average</h3>

                                        <p>{state.item.vote_average}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <MovieDetailInfo />

                <div className="movie__detail-actor">
                    <h5 className="title">
                        actors
                    </h5>

                    <MovieDetailActor />
                </div>
            </div>
        </section>
    </>
}

export default MovieDetail;