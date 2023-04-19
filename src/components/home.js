import MovieImg from '../assets/Image/movie_black2.jpg'

const Home = () => {
    return(
        <div>
            <h1 className='display-3'>Velkommen til Movie Finder SPA</h1>
            <img className="rounded movie_img m-3" src={MovieImg}></img>
        </div>
    );
}

export default Home;