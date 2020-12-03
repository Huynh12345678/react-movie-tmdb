const LoadMore = ({ onClick }) => {
    return <>
        <div className="row">
            <div className="col-12">
                <div className="popular__loadmore">
                    <p onClick={onClick}>Load More</p>
                </div>
            </div>
        </div>
    </>
}

export default LoadMore;