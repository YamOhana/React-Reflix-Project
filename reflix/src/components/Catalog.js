import React, { Component } from 'react'
import Movie from './Movie'
import User from './User'
import {Redirect} from 'react-router-dom'
import MovieDetails from './MovieDetail'

class Catalog extends Component{

        constructor(){
            super()
            this.state = {
                searchVal: ""
            }
        }




        updateSearch = event => this.setState({searchVal: event.target.value})

        isRented = () =>  this.props.movies.some(m => onRent[this.props.currentWatcherId])
        
        moviesOnDisplay = movie => {
            return (
                movie.title.toLowerCase().includes(this.state.searchVal.toLowerCase())
                ? <Movie 
                currentWatcherId={this.props.currentWatcherId}
                updateRent={this.props.updateRent}
                updateMoney={this.props.updateMoney}
                clickedMovie={this.props.clickedMovie}
                movie={movie} key={movie.id}
                  />

                :null 
                
            )
        }


        toRentedSection = () => {
            let rentedMovies = this.movies.filter(m => m.onRent[this.props.currentWatcherId])
            let element =(

                <div>
                    <p className="section">Rented</p>
                    <div className="catalog-container">
                            {rentedMovies.map( m => this.moviesOnDisplay(m))}
                    </div>
                </div>

            )
            return element
        }


        redirect = () => <Redirect to='/' />


        render(){


            if(this.props.currentWatcherId < 0){
                return this.redirect()
            }

            let user = this.props.users.find(x => x.id === this.props.currentWatcherId)
            return (


                <div id="catalog-page">
                    <div id="seach-container">
                        <input type="text" placeholder="Seach the Movie You'd Like to Watch" value={this.state.searchVal} onChange={this.updateSearch}></input>
                        <p className="user-data">Money: {`${user.money}`}</p>
                    </div>
                    {this.isRented() ? this.toRentedSection() : null}

                    <div>
                        <p className="section">Catalog</p>
                        <div className="catalog-container">{this.props.movies.map(m => this.moviesOnDisplay(m))}</div>
                    </div>

                </div>


            )


        }



}


export default Catalog