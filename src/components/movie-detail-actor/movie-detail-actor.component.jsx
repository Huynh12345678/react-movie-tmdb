import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { API_KEY, API_URL, IMAGE_URL, BACKDROP_SIZE } from '../../config/config'

const MovieDetailActors = () => {

    const [state, setState] = useState({
        item: []
    })

    const { id } = useParams();

    useEffect(() => {
        const getDetail = async () => {
            try {
                const response = await axios(`${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`)

                setState({
                    item: response.data.cast
                })
            } catch (err) {
                console.log(err);
            }
        }
        getDetail();
    }, [])

    return <>
        <div className="row mt-4">
            {
                state.item.map((row, index) => (
                   <div className="col-md-3 col-6 mb-4" key={index}>
                       <img src={`${IMAGE_URL}${BACKDROP_SIZE}${row.profile_path}`} className="img-fluid" alt={row.name}/>

                       <div className="name">
                           {row.name}
                       </div>
                   </div>
                ))
            }
        </div>
    </>
}

export default MovieDetailActors;