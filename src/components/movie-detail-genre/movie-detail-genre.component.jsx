import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { API_KEY, API_URL } from '../../config/config'

const MovieDetailGenres = () => {

    const [state, setState] = useState({
        item: []
    })

    const { id } = useParams();

    useEffect(() => {
        const getDetail = async () => {
            try {
                const response = await axios(`${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`)

                setState({
                    item: response.data.genres
                })
            } catch (err) {
                console.log(err);
            }
        }
        getDetail();
    }, [])

    return <>
        <ul className="d-flex m-0 list-unstyled">
            {
                state.item.map((row, index) => (
                    <li key={index}>
                        {row.name}
                    </li>
                ))
            }

        </ul>
    </>
}

export default MovieDetailGenres;