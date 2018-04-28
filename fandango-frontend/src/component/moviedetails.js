import React,{Component} from 'react';
import '../css/moviedetails.css';
import Header from './headers';
import Footer from './footer';
import axios from 'axios';
import '../css/stars.css';
import {Link} from 'react-router-dom';


class moviedetails extends Component{
	constructor(props) {
        super(props);
        this.state = {
			movieDetails : []
        }
    }
	componentDidMount(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        axios('http://localhost:8900/movieById/5ae3f7d340097e06d00bac9b', {
                method: 'get',
                mode: 'cors',
                headers: headers,
            })
            .then((response) => {
                this.setState({
                    movieDetails : this.state.movieDetails.concat(response.data)
                });
            });
	}
	
    render(){
		let rate = 0, reviewText;
		function rateValue(events,rating){
			rate = rating
		}
		function handleReviewTxt(events){
			reviewText = events.target.value;
		}

		function submitReview(events){
			//alert(rate + "  " + reviewText);
			//events.preventDefualt();
			console.log("Rating value : " + rate + " review Text : " + reviewText);
			
		}

		console.log("Response Data : ", this.state.movieDetails);
		let releaseData = null, movieLength = null, movieCategory = null, trailerLink = null;
		var today = new Date();
		this.state.movieDetails.map(movie => {
			console.log("Movie Data : ", movie.releaseDate);
			let releaseDate = new Date(movie.releaseDate);
			
			if(releaseDate > today){
				
				releaseData = "Opens on   " + releaseDate.toLocaleDateString();
			}else{
				releaseData = "Released on " + releaseDate.toLocaleDateString();
			}
			movieLength = movie.movieLength;
			movieCategory = movie.movieCategory;
			trailerLink = movie.trailerLink;
			console.log("Trailer Link : ", trailerLink);

		})

		let castData = null;
		this.state.movieDetails.map(movie => {
			castData = movie.cast.map(cast =>{
				return(
					<li style = {{float : 'left', margin : '0 26px 20px 0', height : '200px', width : '125px', float : 'left'}} class="visual-item">
						<a style = {{background : '#000', display:'block', overflow : 'hidden', width : '100%'}} class="visual-container" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
							<img data-src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/199925/images/masterrepository/fandango/199925/avengersinfinitywar-postera.jpg" class="visual-thumb" alt="Avengers: Infinity War showtimes and tickets" src="https://images.fandango.com/r1.0.444/ImageRenderer/168/250/redesign/static/img/default_poster.png/199925/images/masterrepository/fandango/199925/avengersinfinitywar-postera.jpg"/>
						</a>
						<div style = {{display : 'block', padding : '5px', background : '#fff'}} class="visual-detail">
							<a style = {{fontSize : '20px', lineHeight : '20px', overflow : 'hidden', padding : '0 10px 0 0', maxHeight: '40px', whiteSpace: 'normal'}} class="visual-title dark" href="http://www.fandango.com/avengers:infinitywar_199925/movieoverview">
								{cast.castName}
							</a>
						</div>
                    </li>
				)
			})
		})
		
		let reviewData = null;
		{/*this.state.movieDetails.map(movie => {
			reviewData = movie.reviews.map(review =>{
				return(
					<li class="fan-reviews__item" style = {{paddingBottom : '20px', paddingTop : '20px'}}>
						        
						<div class="fan-reviews__user-name">
							{review.fName + '  ' + review.lName}
						</div>
						<div class="fan-reviews__review">{review.reviewText}</div>
					</li>
				)
			})
		});*/}
    	return ( 
			<div>
				<Header />
				<div>
					<section class="subnav">
						<div class="row">
							<div class="width-100">
								<h3  style = {{color : 'white', fontSize : '35px'}} class="subnav__title heading-style-1 heading-size-xl timing-header">
									{localStorage.getItem('movieName') + '   '}
									<span class="subnav__title--accent">
										NOW PLAYING
										<span class="js-subnav__user-location"></span>
									</span>
								</h3>
								<ul class="subnav__link-list">
									<li class="subnav__link-item">
										<a class="subnav__link subnav__link--active" href="/95101_movietimes">
											Overview
										</a>
									</li>
									<li class="subnav__link-item">
										<a class="subnav__link" href="/95101_movietimes?ticketedonly=true">
											Movie Time + Tickets
										</a>
									</li>
									<li class="subnav__link-item">
										<a class="subnav__link" href="/95101_movietimes?mytheaters=true">
											Synopsis
										</a>
									</li>
									<li class="subnav__link-item">
										<a class="subnav__link" href="/95101_movietimes?mytheaters=true">
											Movie Review
										</a>
									</li>
									<li class="subnav__link-item">
										<a class="subnav__link" href="/95101_movietimes?mytheaters=true">
											Trailers
										</a>
									</li>
								</ul>
							</div>
						</div>
					</section>
					<br/>
					<div style = {{width : '370px', float : 'left', paddingLeft : '50px'}} class="msp__movie-details-container">
					<section class="movie-details">
						<a class="movie-details__mop-link" href="/avengers-infinity-war-199925/movie-overview">
							<img class="movie-details__movie-img visual-thumb" src="//images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/199925/AvengersInfinityWar-postera.jpg" alt="Avengers: Infinity War Movie Poster"/>
						</a>
						<ul class="movie-details__detail">
							<li></li> 
							<li class="movie-details__release-date">{releaseData}</li>
							<li>
								{movieLength}
							</li>
							<li>{movieCategory}</li>
							
						<li>
						</li>
						
						</ul>
						<ul class="movie-details__film-formats">
							<h3 class="movie-details__film-formats-header">SEE IT IN</h3>   
							<li class="movie-details__format"><span class="movie-details__format-logo">35MM</span></li>
							<li class="movie-details__format"><span class="movie-details__format-logo">Digital 3D</span></li>
							<li class="movie-details__format"><span class="movie-details__format-logo">IMAX</span></li>
							<li class="movie-details__format"><span class="movie-details__format-logo">IMAX 3D</span></li>
						</ul>
						<section class="movie-offer">
							<a class="js-offer-cta movie-offer__label" data-offer-id="282">FREE* EXCLUSIVE POSTER</a>
							<div class="movie-offer__title">with ticket purchase (S&amp;H not included).</div>
							<div class="movie-offer__disclaimer">LIMITED TIME. SUBJECT TO AVAILABILITY. TERMS APPLY.</div>
							<a class="js-offer-cta movie-offer__flag icon-gift-box-white" data-offer-id="282">SPECIAL OFFER</a>
						</section>
					</section> 
				</div>
				<div id="DIV_85" style = {{width : '560px', height : '500px', float : 'left'}}>
						<section id="SECTION_86">
							
						
						<iframe frameborder="0" allowfullscreen width="560" height="500" src="https://www.youtube.com/embed/Dx9DJXsQJRs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
						
						</section>
					</div>

					<div style = {{width : '380px',position : 'relative',float : 'right'}}>
						<h2>Fan Reviews</h2>
						<ul>
							{reviewData}
						</ul>
						<br/><br/><br/>
						<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Submit a Review</button>
						<div class="modal fade" id="myModal" role="dialog">
							<div class="modal-dialog">
							
							
							<div class="modal-content">
								<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<h4 class="modal-title">Submit Your Review</h4>
								</div>
								
								<br/>
								
								<div class="modal-body">
								<div class="form-group">
								<label for="comment">Rating:</label>
								<div class="rate">
									<input onClick = {(e) => rateValue(e,5)} type="radio" id="star5" name="rate" value="5" />
									<label for="star5" title="text"></label>
									<input onClick = {(e) => rateValue(e,4)} type="radio" id="star4" name="rate" value="4" />
									<label for="star4" title="text">4 stars</label>
									<input onClick = {(e) => rateValue(e,3)} type="radio" id="star3" name="rate" value="3" />
									<label for="star3" title="text">3 stars</label>
									<input onClick = {(e) => rateValue(e,2)} type="radio" id="star2" name="rate" value="2" />
									<label for="star2" title="text">2 stars</label>
									<input onClick = {(e) => rateValue(e,1)} type="radio" id="star1" name="rate" value="1" />
									<label for="star1" title="text"></label>
  								</div>
								</div>
								<br/><br/>
								</div>
								<br/>
								<div style= {{display : 'inline-block', width : '100%'}} class="form-group">
  									<label for="comment">&nbsp;&nbsp;&nbsp;&nbsp;Review:</label>
  									<textarea onChange = {(e) => handleReviewTxt(e)} class="form-control" rows="5" id="comment"></textarea>
								</div>
								<div class="modal-footer">
								<Link to = "" onClick = {(e) => submitReview(e)}type="button" class="btn btn-default" data-dismiss="modal">Submit</Link>
								</div>
							</div>
							
							</div>
  						</div>
					</div>
					<br/><br/>
					<div class="carousel-cast-crew" style = {{paddingLeft : '50px',paddingTop : '50px',overflow : 'hidden', marginBottom : '20px', width : '100%'}}>
                    <h2 style = {{color : '#4c4c4c', margin : '0 0 15px', padding : '0 30px', position : 'relative', textAlign : 'center'}} class="inline heading-style-stub heading-style-1 heading-size-l section-header">Cast + Crew</h2>
                    <ul style = {{margin : '0 -30px 20px 0', overflow : 'auto', lifeStyle : 'none', height : '300px'}}>
						{castData}
                    </ul>

					
                </div>
				
				</div>
				
				<Footer />
			</div>
    	);
    }
}

export default moviedetails;
