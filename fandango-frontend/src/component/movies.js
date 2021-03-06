import React,{Component} from 'react';
import Header from './headers';
import Footer from './footer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';


class movies extends Component{
    constructor(props) {
        super(props);
        this.state = {
            initialMovies:[],
            movies : [],
            elapsed: 0,
            start:new Date(),
            count: 0
            
        }

        this.filterGenre = this.filterGenre.bind(this);
        this.tick=this.tick.bind(this);
        this.handleSubmitForTime=this.handleSubmitForTime.bind(this);
        this.incrementCount=this.incrementCount.bind(this);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    
    tick(){
        this.setState({...this.state,elapsed: new Date() - this.state.start});
    }

    handleSubmitForTime(events,nextPage){
        console.log("Page Count : ", this.state.count);
        //events.preventDefault();
        let userDetails = JSON.parse(localStorage.getItem('userid'));
        let prevPage = localStorage.getItem('currentPage');
        localStorage.setItem('currentPage',nextPage);
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(1);  
        console.log("Inside Time ");
        //alert("Page Count Value : " + this.state.count);
        var url = 'http://localhost:8900/log/';
        axios(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: JSON.stringify({
                time: seconds,
                page :prevPage,
                pageclick : this.state.count,
                hallticketcount:0,
                movierating:0,
                movie : "",
                movieclick : 0,
                fname : userDetails.fName,
                lname : userDetails.lName,
                state : "CA",
                city : "New York",
                hall : "",
                hallbooking:0,
                moviebooking:0,
                bookingdate:""

            })
            
            
        }).then((res) => {
            console.log("Response sent");
        });

}

    filterGenre(events){
        //alert("Inide Genre Click");
        events.preventDefault();
        
        var  filteredMovies=this.state.initialMovies;
        if(events.target.name==="all"){
            this.setState({
                ...this.state,
                movies:this.state.initialMovies
            })
        }else if(events.target.name==="action"){
            filteredMovies=[];
            filteredMovies = this.state.initialMovies.filter(function(movie){
                return movie.movieCategory.toLowerCase().search(
                    events.target.name.toLowerCase()) !== -1;
                });
        }else if(events.target.name==="drama"){
            filteredMovies=[];
            filteredMovies = this.state.initialMovies.filter(function(movie){
                return movie.movieCategory.toLowerCase().search(
                    events.target.name.toLowerCase()) !== -1;
                });
        }else if(events.target.name==="comedy"){
            filteredMovies=[];
            filteredMovies = this.state.initialMovies.filter(function(movie){
                return movie.movieCategory.toLowerCase().search(
                    events.target.name.toLowerCase()) !== -1;
                });
        }else if(events.target.name==="kids"){
            filteredMovies=[];
            filteredMovies = this.state.initialMovies.filter(function(movie){
                return movie.movieCategory.toLowerCase().search(
                    events.target.name.toLowerCase()) !== -1;
                });
        }else if(events.target.name==="horror"){
            filteredMovies=[];
            filteredMovies = this.state.initialMovies.filter(function(movie){
                return movie.movieCategory.toLowerCase().search(
                    events.target.name.toLowerCase()) !== -1;
                });
        }else if(events.target.name==="romance"){
            filteredMovies=[];
            filteredMovies = this.state.initialMovies.filter(function(movie){
                return movie.movieCategory.toLowerCase().search(
                    events.target.name.toLowerCase()) !== -1;
                });
        }else if(events.target.name==="sci-fi"){
            filteredMovies=[];
            filteredMovies = this.state.initialMovies.filter(function(movie){
                return movie.movieCategory.toLowerCase().search(
                    events.target.name.toLowerCase()) !== -1;
                });
        }else if(events.target.name==="animated"){
            filteredMovies=[];
            filteredMovies = this.state.initialMovies.filter(function(movie){
                return movie.movieCategory.toLowerCase().search(
                    events.target.name.toLowerCase()) !== -1;
                });
        }else if(events.target.name==="suspense"){
            filteredMovies=[];
            filteredMovies = this.state.initialMovies.filter(function(movie){
                return movie.movieCategory.toLowerCase().search(
                    events.target.name.toLowerCase()) !== -1;
                });
        }

       
            this.setState({
                ...this.state,
                movies:filteredMovies
            });
        
    }

    incrementCount = () => {
        
        this.setState(
            {...this.state, count: this.state.count + 1 }
        );
        //alert("Count Value : " + this.state.count);
    };
    
    componentDidMount(){
        this.timer = setInterval(this.tick, 50);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        axios('http://localhost:8900/movies', {
                method: 'get',
                mode: 'cors',
                headers: headers,
            })
            .then((response) => {
                console.log("Movies Response  : ", response.data);
                this.setState({
                    movies : this.state.movies.concat(response.data),
                    initialMovies:this.state.initialMovies.concat(response.data)
                });
            });
      }
    nextDate(dayIndex) {
        var today = new Date();
        today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);
        return today;
    }
    render(){
    let redirectVar = null;
    if(!localStorage.getItem('userid')){
        redirectVar = <Redirect to= "/signin" />
    }
    let sunday = this.nextDate(0);
	console.log("Next Sunday : ", sunday);
	var today = new Date();
	console.log("Todays Date : ", today);
    let releaseDate= null;
    console.log("Resposne Data : ", this.state.movies);
    let openingMovie = [], nowPlaying = [], openIndex = 0,nowPlayIndex = 0;;
	let openMovie = this.state.movies.map(movie => {
		releaseDate = movie.releaseDate;
		releaseDate = new Date(releaseDate);
		console.log("Release Date : ", releaseDate);
		if(releaseDate < sunday && releaseDate > today){
            if(openIndex < 6){
                console.log("Movie Photo : ", movie.moviePhoto);
                openingMovie.push (
                    
                    <div onClick = {(e) => {localStorage.setItem('movieID', movie._id)}}>
                    <li  style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
                        <Link to = {"/moviedetails/"+ movie._id}  onClick = {(e)=> {this.handleSubmitForTime(e,'moviedetails')}} style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" >
                            <img data-src={"http://localhost:8900/moviesImages/"+movie.moviePhoto} class="visual-thumb" alt="Movie Image" src={"http://localhost:8900/moviesImages/"+movie.moviePhoto}/>
                        </Link>
                        <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                            <Link to = {"/moviedetails/"+ movie._id} onClick = {(e)=> {this.handleSubmitForTime(e,'moviedetails')}}  style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" >
                                {movie.movieTitle}
                            </Link>
                        </div>
                    </li>
                    </div>
                );
            }
            openIndex++;
			
        }else //if(releaseDate < today)
		{
            if(nowPlayIndex < 6){
                console.log("Movie Photo : ", movie.moviePhoto);
                nowPlaying.push (
					<div onClick = {(e) => {localStorage.setItem('movieID', movie._id)}}>
						<li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
                            <Link onClick = {(e) => this.handleSubmitForTime(e,'moviedetails')} to = {"/moviedetails/"+ movie._id}  style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" >
                                <img data-src= {"http://localhost:8900/moviesImages/"+movie.moviePhoto} class="visual-thumb" alt="movie Image" src={"http://localhost:8900/moviesImages/"+movie.moviePhoto}/>
							</Link>
							<div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <Link onClick = {(e) => this.handleSubmitForTime(e,'moviedetails')} to = {"/moviedetails/"+ movie._id}  style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" >
									{movie.movieTitle}
								</Link>
							</div>
						</li>
					</div>
				)
            }
            nowPlayIndex++;
            
        }
    });
        console.log("Movies : ", this.state.movies);
        let styleLI = {
            listStyleType: 'none',
            display: 'inline-block',
            height: '30px',
            border: '1px solid #ccc',
            textAlign: 'center',
            backgroundColor: '#fff',
            verticalAlign: 'middle',
            padding: '8px 10px',
            margin: '0 5px 20px 0',
            fontWeight : '700'
        }
       return ( 
        <div> 
        {redirectVar}
        <Header />
        <div id="page" role="main">
            <section class="subnav">
                <div class="row">
                    <div class="width-100">
                        <h3  style = {{color : 'white', fontSize : '35px'}} class="subnav__title heading-style-1 heading-size-xl timing-header">
                             MOVIES
                            <span class="subnav__title--accent">
                                NOW PLAYING
                                <span class="js-subnav__user-location"></span>
                            </span>
                        </h3>
                        <ul class="subnav__link-list">
                            <li class="subnav__link-item">
                                <a class="subnav__link subnav__link--active" href="/95101_movietimes">
                                    Now Playing
                                </a>
                            </li>
                            <li class="subnav__link-item">
                                <a class="subnav__link" href="/95101_movietimes?ticketedonly=true">
                                    Coming Soon 
                                </a>
                            </li>
                            <li class="subnav__link-item">
                                <a class="subnav__link" href="/95101_movietimes?mytheaters=true">
                                    Movie Genres
                                </a>
                            </li>
                            <li class="subnav__link-item">
                                <a class="subnav__link" href="/95101_movietimes?mytheaters=true">
                                    Top Box Office
                                </a>
                            </li>
                            <li class="subnav__link-item">
                                <a class="subnav__link" href="/95101_movietimes?mytheaters=true">
                                    At Home
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <br/><br/>
            <div style = {{width : '75%', marginLeft : '40px'} }class="large-9 columns">
                <div style = {{position : 'relative', top : '-20px'}} class="genre-menu tabs">
                    <h3 style = {{fontSize : '14px', fontFamily : 'proxima novs'}}class="heading-size-xs heading-style-3">Filter by Movie Genres</h3><br/>
                    <div style = {{height : '45px', overflow : 'hidden'}} class="filter-wrap">
                        <ul>
                        <li style = {styleLI}>
                                <a id="GenreName" name="all" onClick = {this.filterGenre} >ALL</a>
                            </li>  
                            <li style = {styleLI} >
                                <a id="GenreName"  name="action" onClick = {this.filterGenre} >ACTION</a>
                            </li>
                        
                            <li style = {styleLI}>
                                <a id="GenreName"  name="drama" onClick = {this.filterGenre}>DRAMA</a>
                            </li>
                        
                            <li style = {styleLI}>
                                <a id="GenreName"name="comedy" onClick = {this.filterGenre}>COMEDY</a>
                            </li>
                        
                            <li style = {styleLI}>
                                <a id="GenreName" name="kids" onClick = {this.filterGenre}>KIDS</a>
                            </li>
                        
                            <li style = {styleLI}>
                                <a id="GenreName" name="horror" onClick = {this.filterGenre}>HORROR</a>
                            </li>
                        
                            <li style = {styleLI}>
                                <a id="GenreName" name="romance" onClick = {this.filterGenre}>ROMANCE</a>
                            </li>
                        
                            <li style = {styleLI}>
                                <a id="GenreName" name="sci-fi" onClick = {this.filterGenre}>SCI-FI</a>
                            </li>
                        
                            <li style = {styleLI}>
                                <a id="GenreName" name="animated" onClick = {this.filterGenre}>ANIMATED</a>
                            </li>
                        
                            <li style = {styleLI}>
                                <a id="GenreName" name="suspense" onClick = {this.filterGenre}>SUSPENSE</a>
                            </li>
                        
                        </ul>
                    </div>
                </div>
                <div onClick={this.incrementCount} class="movie-ls-group" style = {{width : '100%'}}>
                    <h2 style = {{color : '#4c4c4c', margin : '0 0 15px', padding : '0 30px', position : 'relative', textAlign : 'center'}} class="inline heading-style-stub heading-style-1 heading-size-l section-header">Opening This Week</h2>
                    <ul style = {{margin : '0 -30px 20px 0', overflow : 'auto', lifeStyle : 'none',height : '350px'}}>
                        {/*<li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/199925/images/masterrepository/fandango/199925/avengersinfinitywar-postera.jpg" class="visual-thumb" alt="Avengers: Infinity War showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/199925/images/masterrepository/fandango/199925/avengersinfinitywar-postera.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>
                                            
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/209250/images/masterrepository/fandango/209250/disobedience2018.jpg" class="visual-thumb" alt="Disobedience (2018) showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/209250/images/masterrepository/fandango/209250/disobedience2018.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>                   
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/209376/images/masterrepository/fandango/209376/kings-2017.jpg" class="visual-thumb" alt="Kings (2018) showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/209376/images/masterrepository/fandango/209376/kings-2017.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>                          
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
    
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg" class="visual-thumb" alt="The Test and the Art of Thinking showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>                   
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
    
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg" class="visual-thumb" alt="The Test and the Art of Thinking showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
    
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg" class="visual-thumb" alt="The Test and the Art of Thinking showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>*/}
                        {openingMovie}                    
                    </ul>
                </div>
                <div class="movie-ls-group" style = {{width : '100%'}}>
                    <h2 style = {{color : '#4c4c4c', margin : '0 0 15px', padding : '0 30px', position : 'relative', textAlign : 'center'}} class="inline heading-style-stub heading-style-1 heading-size-l section-header">Now Playing</h2>
                    <ul style = {{margin : '0 -30px 20px 0', overflow : 'auto', lifeStyle : 'none', height : '350px'}}>
                        {/*<li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/199925/images/masterrepository/fandango/199925/avengersinfinitywar-postera.jpg" class="visual-thumb" alt="Avengers: Infinity War showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/199925/images/masterrepository/fandango/199925/avengersinfinitywar-postera.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>
                                            
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/209250/images/masterrepository/fandango/209250/disobedience2018.jpg" class="visual-thumb" alt="Disobedience (2018) showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/209250/images/masterrepository/fandango/209250/disobedience2018.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>                   
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/209376/images/masterrepository/fandango/209376/kings-2017.jpg" class="visual-thumb" alt="Kings (2018) showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/209376/images/masterrepository/fandango/209376/kings-2017.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>                          
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
    
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg" class="visual-thumb" alt="The Test and the Art of Thinking showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>                   
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
    
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg" class="visual-thumb" alt="The Test and the Art of Thinking showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>
                                
                        <li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
    
                            <a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                <img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg" class="visual-thumb" alt="The Test and the Art of Thinking showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/210959/images/masterrepository/fandango/210959/thetestandtheartofthinking2018.jpg"/>
                            </a>
                            <div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
                                <a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
                                    Avengers: Infinity War
                                </a>
                                <span class="visual-sub-title">Opens Today</span>
                            </div>
                        </li>*/}
                        {nowPlaying}
                    </ul>
                </div>
            </div>
        </div>
        <Footer />
    </div>
       );
    }
}

export default movies;