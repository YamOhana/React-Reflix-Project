
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Catalog from './Catalog'




class MovieDetail extends Component {



    getMovieId = () => parseInt(this.props.match.params.id)

    redirect = () => <Redirect to="/" />



    render(){
        if(this.props.currentWatcherId < 0){
            return this.redirect()
        }


        let movie = this.props.movies.find(m => m.id === this.getMovieId())

        return(
            <div className="movie-details-contaier">
                <h2>{movie.title}</h2>
                <img src={movie.img} alt={`${movie.title} cover`}/>
                <p>{movie.descrShort}</p>
            </div>
        )


    }



}



export default MovieDetail
