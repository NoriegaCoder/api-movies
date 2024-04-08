const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


Movie.belongsToMany(Genre,{through:"moviesGenres"})
Genre.belongsToMany(Movie,{through:"moviesGenres"})

Movie.belongsToMany(Actor,{through:"moviesActors"})
Actor.belongsToMany(Movie,{through:"moviesActors"})

Movie.belongsToMany(Director,{through:"moviesDirector"})
Director.belongsToMany(Movie,{through:"moviesDirector"})