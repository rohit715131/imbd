$('document').ready(()=>{
	

	

	// this is for title 
	$("#search-title").click(()=>{
		let getMovieTitle = $('#movieTitle').val();
		console.log("the movie title" + " " + getMovieTitle);
		if(getMovieTitle == 'null' || getMovieTitle == ''|| getMovieTitle == 'undefine'){
			$('#search1').focus().css("border","2px solid red");
			alert("OOPS You Forgot To Fill Title")
		}
		else{
			getAllData(getMovieTitle , 1);
		}
	});//click function end from here


	// this is for year
	$('#searchTitleId2').click(()=>{
		let getMovieYear = $('#movieYear2').val();
		let getMovieTitle = $('#movieTitle2').val();
		console.log("the movie year" + " " + getMovieYear)
		console.log("the movie title" + " " + getMovieTitle)
		if(getMovieTitle == 'null' || getMovieTitle == ''|| getMovieTitle == 'undefine'){
			$('#search2').focus().css("border","2px solid red");
			alert("OOPS You Forgot To Fill Title")
		}
		else if(getMovieYear == 'null' || getMovieYear == ''|| getMovieYear == 'undefine'){
			$('#movieYear2').focus().css("border","2px solid red");
			alert("OOPS You Forgot To Fill year")
		}
		else{
			getAllData(getMovieTitle,getMovieYear);
		}
		
	});

	// this is for ID
	$('#searchTitleId3').click(()=>{
		let getMovieId = $('#movieYear3').val();
		console.log("the movie Id" + " " + getMovieId)
		if(getMovieId == 'null' || getMovieId == ''|| getMovieId == 'undefine'){
			$('#movieIdSearch3').focus().css("border","2px solid red");
			alert("OOPS You Forgot To Fill Id")
		}
		
		else{
			getAllData(getMovieId , 3);
		}
		
	});
	


	/*============ WINDOW LOADER START FROM HERE========*/
	$(".loader").hide();
	/*============ WINDOW LOADER END FROM HERE========*/
	$(".backPage").click((event) => {
		location.reload();
		event.preventDefault();
	});

});// document ready function end from here

// AJAX JQUERY CODE START FROM HERE 

let getAllData= (titleName,numbers)=>{
	var links = "";
	console.log("got the title" + titleName);
	console.log("got the year" + numbers);
	//for the title code
	if(titleName !== 'undefined' && numbers == 1){
		links+=`https://www.omdbapi.com/?t=${titleName}&apikey=9dd4942b`;
		console.log("got the title" + links);
	
	}
	else if(titleName !== 'undefined' && numbers !== 1 && numbers !== 3){
		links+=`https://www.omdbapi.com/?t=${titleName}&y=${numbers}&apikey=9dd4942b`;
		console.log("got the title and Year" + links);
	}
	else if(titleName !== 'undefined' && numbers == 3){
		links+=`https://www.omdbapi.com/?i=${titleName}&apikey=9dd4942b`;
		console.log("got the ID" + links);
	}
	else{
		alert("Sorry you can't access this")
	} 


	
	$.ajax({
		type:"GET",
		async:true,
		url:links,
		success:(response)=>{
		
			/*===================CONTENT SHOW AND HIDE START FROM HERE===============*/
			$('.showDetails').css('display','block');
			/* ======================= SEARCH PORTIO START FROM HERE ==============*/
			// MOVIE IMAGES >/
			console.log('poster new'+response.Poster);
			if(response.Poster !== null && response.Poster !== undefined){ 
			var df=	$('#posterImg').attr("src", (response.Poster == 'N/A' ? 'images/dummy1.jpg' : response.Poster));
				console.log("inside the success" + df);
			} else{
				// var df=	$('#posterImg').attr('<img src="images/dummy.jpg"/>');
			}

			// MOVIE TITLE >/
			
				var df=	$('#movieTitles1').append(response.Title);
					console.log("inside the success" + df);
			//	} else{
			//		console.log(`No title`);
			//	}

			// MOVIE ID
			if(response.Title !== null && response.Title !== undefined){ 
				var df=	$('#movieId').append(response.imdbID);
					console.log("inside the MOVIE ID" + df);
				} else{
					console.log(`No title`);
				}

				// MOVIE YEAR
				if(response.Title !== null && response.Title !== undefined){ 
					var df=	$('#movieYears').append(response.Year);
						console.log("inside the YEAR" + df);
					} else{
						console.log(`No title`);
					}

					//Released date

					if(response.Released !== null && response.Released !== undefined){
						var df =$('#movieReleased').append(response.Released)
					} else{
						console.log(`No movie Released `);
					}

					//Director 

					if(response.Director !== null && response.Director !== undefined){
						var df =$('#movieDirector').append(response.Director)
					} else{
						console.log(`No movie Director `);
					}
					//Writer 

					if(response.Writer !== null && response.Writer !== undefined){
						var df =$('#movieWriter').append(response.Writer)
					} else{
						console.log(`No movie Writer `);
					}
					

					//Language 
					if(response.Language !== null && response.Language !== undefined){
						var df =$('#movieLanguage').append(response.Language)
					} else{
						console.log(`No movie Language `);
					}

					//Country 
					if(response.Country !== null && response.Country !== undefined){
						var df =$('#movieCountry').append(response.Country)
					} else{
						console.log(`No movie Country `);
					}

					//Awards 
					if(response.Awards !== null && response.Awards !== undefined){
						var df =$('#movieAwards').append(response.Awards)
					} else{
						console.log(`No movie Awards `);
					}


					//Ratings 
					if(response.Ratings !== null && response.Ratings !== undefined){
						var df =$('#movieRatings').append(response.Ratings[0].Value)
					} else{
						console.log(`No movie Ratings `);
					}


			/* ======================= SEARCH PORTIO START FROM HERE ==============*/

		}, // success function end from here
		timeout:6000,

		error:(response)=>{
			alert(err.responseJSON.error.message);
		}, // error function end from here
	
		beforeSend: () => {
			$(".hideContent").hide();
			$(".loader").show();
			
		},
		complete : () => {
                
                $('.loader').hide();

      }
	});// ajax function end from here
}
