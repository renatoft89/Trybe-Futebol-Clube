import ILeaderboard from '../interfaces/ILeaderBoard';
import IMatcheHome from '../interfaces/IMatcheHome';

const calculatePoints = (teamHome: IMatcheHome[]) => {
  let points = 0;

  teamHome.map((matche) => {
    if (matche.homeTeamGoals > matche.awayTeamGoals) points += 3;
    if (matche.homeTeamGoals === matche.awayTeamGoals) points += 1;
    return points;
  });
  return points;
};

const calculateGames = (matche: IMatcheHome[]) => matche.length;

const calculateResults = (teamHome: IMatcheHome[]) => {
  let victories = 0;
  let draws = 0;
  let losses = 0;

  teamHome.map((matche) => {
    if (matche.homeTeamGoals > matche.awayTeamGoals) victories += 1;
    if (matche.homeTeamGoals === matche.awayTeamGoals) draws += 1;
    if (matche.homeTeamGoals < matche.awayTeamGoals) losses += 1;

    return { victories, draws, losses };
  });
  return { victories, draws, losses };
};

const calculateGoals = (teamHome: IMatcheHome[]) => {
  let homeGoals = 0;
  let awayGoals = 0;
  let goalsBalance = 0;

  teamHome.map((matche) => {
    if (matche.homeTeamGoals) homeGoals += matche.homeTeamGoals;
    if (matche.awayTeamGoals) awayGoals += matche.awayTeamGoals;
    goalsBalance = homeGoals - awayGoals;
    return { homeGoals, awayGoals, goalsBalance };
  });
  return { homeGoals, awayGoals, goalsBalance };
};

const calculateEfficiency = (teamHome: IMatcheHome[]) => {
  const totalPoints = calculatePoints(teamHome);
  const totalGames = calculateGames(teamHome);
  const result = (totalPoints / (totalGames * 3)) * 100;

  const efficiency = parseFloat(result.toFixed(2));
  return efficiency;
};

const createClassification = (teamsAndMatches: ILeaderboard[]) => {
  const result = teamsAndMatches.map((matche) => ({
    name: matche.teamName,
    totalPoints: calculatePoints(matche.teamHome),
    totalGames: calculateGames(matche.teamHome),
    totalVictories: calculateResults(matche.teamHome).victories,
    totalDraws: calculateResults(matche.teamHome).draws,
    totalLosses: calculateResults(matche.teamHome).losses,
    goalsFavor: calculateGoals(matche.teamHome).homeGoals,
    goalsOwn: calculateGoals(matche.teamHome).awayGoals,
    goalsBalance: calculateGoals(matche.teamHome).goalsBalance,
    efficiency: calculateEfficiency(matche.teamHome),
  }));
  // console.log(result);
  return result as unknown as ILeaderboard[];
};

export default createClassification;
