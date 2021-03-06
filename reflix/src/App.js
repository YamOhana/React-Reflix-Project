import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import Landing from './components/Landing'
import Catalog from './components/Catalog'
import MovieDetail from './components/MovieDetail'


class App extends Component {
  constructor() {
    super()

    this.state = {
      movies: [
        { id: 0, isRented: { 0: false, 1: false, 2: false, 3: false }, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
        { id: 1, isRented: { 0: false, 1: false, 2: false, 3: false }, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
        { id: 2, isRented: { 0: false, 1: false, 2: false, 3: false }, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
        { id: 3, isRented: { 0: false, 1: false, 2: false, 3: false }, title: "The Sword in the Stone", year: 1963, img: "https://scdn.nflximg.net/images/0230/3330230.jpg", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
        { id: 4, isRented: { 0: false, 1: false, 2: false, 3: false }, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
      ],
      users: [
        { id: 0, name: "Yam", backgroundColor: "#03B5AA", money: 10 },
        { id: 1, name: "Foxy", backgroundColor: "#59114D", money: 15 },
        { id: 2, name: "Dad", backgroundColor: "#E98A15", money: 17 },
        { id: 3, name: "Leech", backgroundColor: "#157F1F", money: 18 }
      ],
      currentUserId: -1
    }
  }


  updateRented = (movie, bool) => {
    movie.isRented[this.state.currentWatcherId] = bool
    return movie
  }

  clickedMovie = id => {

    let movies = [...this.state.movies]
    let movie = movies.find(m => m.id === id)

    let userId = this.state.currentWatcherId
    let users = [...this.state.users]
    let user = users.find(u => u.id === userId)

    let currentMoney = user.money

    if (movie.isRented[userId]) {

      movie = this.updateRented(movie, false)
      user = this.updateBudget(user, currentMoney + 3)

    } else if (!movie.isRented[userId] && this.hasEnoughBudget(userId)) {

      movie = this.updateRented(movie, true)
      user = this.updateBudget(user, currentMoney - 3)

    } else if (!this.hasEnoughBudget(userId)) {
      return alert("You don't have enough money. Please return a movie and try again.")
    }

    this.setState({ movies })
    this.setState({ users })
  }

  hasEnoughBudget = userId => {
    let user = this.state.users.find(u => u.id === userId)
    return (user.budget - 3) >= 0 ? true : false
  }

  updateBudget = (user, newBudget) => {
    user.budget = newBudget
    return user
  }

  updateUser = id => this.setState({ currentUserId: id })

  render() {

    let movies = this.state.movies

    return (
      <Router>
        <div className="App">
          <div id="link-header">
            <Link to='/'>Home</Link>
            <Link to='/catalog'>Catalog</Link>
            <div id="logo">
              <Link to='/'>REFLIX</Link>
            </div>
          </div>

          <Route exact path='/' render={() => <Landing users={this.state.users} updateUser={this.updateUser} />} />
          <Route exact path='/catalog' render={() => <Catalog movies={movies} users={this.state.users} clickedMovie={this.clickedMovie} currentUserId={this.state.currentUserId} />} />
          <Route exact path='/movies/:id' render={({ match }) => <MovieDetail match={match} movies={movies} currentUserId={this.state.currentUserId} />} />
        </div>
      </Router>
    )
  }
}

export default App