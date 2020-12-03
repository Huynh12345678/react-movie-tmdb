import { useState, useEffect } from 'react'
import axios from 'axios'
import './popular-overview.styles.scss'
import { API_KEY, API_URL, IMAGE_URL, BACKDROP_SIZE } from '../../config/config'
import { Link } from 'react-router-dom'
import LoadMore from '../load-more/load-more.component'
import Spinner from '../spinner/spinner.component'
import SearchBar from '../search-bar/search-bar.component'

const PopularOverview = () => {
    const [movie, setMovie] = useState({
        listMovie: [],
        currentPage: 1,
        totalPages: 1,
        searchTerm: ""
    })

    const [load, setLoad] = useState({
        loading: false,
    })

    useEffect(() => {
        setLoad({
            loading: true
        })

        const getList = async () => {
            try {
                const result = await axios.get(`${API_URL}movie/popular/?api_key=${API_KEY}&language=en-US&page=1`);

                setMovie({
                    ...movie,
                    listMovie: result.data.results
                })
            } catch (err) {
                console.log(err);
            }
        }

        getList();
    }, [])

    const LoadMoreButton = async () => {
        setLoad({
            loading: true,
        })

        const result = await axios.get(`${API_URL}movie/popular/?api_key=${API_KEY}&language=en-US&page=${movie.currentPage + 1}`);

        setMovie({
            listMovie: [...movie.listMovie, ...result.data.results],
            currentPage: result.data.page,
            totalPages: result.data.total_pages
        })

        setLoad({
            loading: false,
        })
    }

    const getSearch = async ({ searchTerm }) => {
        setLoad({
            loading: true
        })

        const result = await axios.get(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`);

        setMovie({
            listMovie: [...movie.listMovie || result.data.results],
            // searchTerm:
        })
    }

    return <>
        <SearchBar callback={getSearch} />
        <section className="popular">
            <h2 className="popular__title">
                Popular Movie
            </h2>

            <div className="popular__grid">
                <div className="row">
                    {
                        movie.listMovie.map((item, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                                <div className="popular__grid-thumb">
                                    <Link to={`${item.id}`} >
                                        <img src={`${IMAGE_URL}${BACKDROP_SIZE}${item.poster_path}`} className="img-fluid" alt={item.title} />
                                    </Link>
                                </div>

                                <div className="popular__grid-title">
                                    <Link to={`${item.id}`}
                                        className="popular__grid-title-link">
                                        {item.title}
                                    </Link>
                                </div>


                                <div className="popular__grid-date">
                                    <p className="m-0">
                                        <span>release date</span>:
                                        {item.release_date}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {
                    load.loading ? <Spinner /> : null
                }
                {movie.currentPage <= movie.totalPages &&
                    !load.loading ? (
                        <LoadMore onClick={LoadMoreButton} />
                    ) : null}
            </div>
        </section>
    </>
}

export default PopularOverview;