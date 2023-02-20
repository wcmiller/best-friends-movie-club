import moment from 'moment';
import movieFormatter from './movieFormatter';

function determineIsTied(week){
  const [ first, second, third ] = [...week.movies].sort((movA, movB) => movB.vote.length - movA.vote.length);
  return  first.vote.length === 2 && 
    second.vote.length === 2 && 
    third.vote.length === 1 || (third.vote.length === 0 && week.absentees.length === 1);
}

function determineHasVoted(week, user){
  const allVotes = week.movies.reduce((acc, movie) => ([...acc, ...movie.vote]), []);
  return !!allVotes.find(vote => vote.userId === user.id);
}

function determineCanVote(week, user){
  const alreadyVoted = determineHasVoted(week, user);
  const isTied = determineIsTied(week);
  // ALREADY VOTED
  if(alreadyVoted){
    return false;
  }
  // PICKER AND ISN'T TIED
  if(week.pickerId === user.id && !isTied){
    return false;
  }
  return true;
}

function determineWinnerId(week){
  const [first, second, third] = [...week.movies].sort((movA, movB) => movB.vote.length - movA.vote.length);
  // ONE MOVIE HAS 3 VOTES
  if(first.vote.length > 2){ 
    return first.movieId;
  }
  // ONE MOVIE HAS 2 VOTES, 4 VOTES CAST, HAS ABSENTEE
  if(first.vote.length === 2 && second.vote.length === 1 && third.vote.length === 1 && week.absentees.length > 0){
    return first.movieId;
  }
  return null;
}

function weekFormatter(week, user){
  const canVote = determineCanVote(week, user);
  const winnerId = determineWinnerId(week);
  const isTied = determineIsTied(week)
  return {
    // WEEK INFO
    id: week.id,
    number: week.number,
    date: moment(week.date).format('MMM do'), // 'Dec 31',
    picker: week.picker.name,
    pickerId: week.picker.id,
    pickerEmail: week.picker.email,
    messageId: week.messageId,
    winnerId,
    canVote,
    isTied,

    //MOVIES 
    movies: week.movies.map((movie) => movieFormatter(movie, canVote, winnerId)),

    // AJAX FIELDS
    pendingPick: false,
    isLoading: false,
    error: false,
  }
}

export default weekFormatter;