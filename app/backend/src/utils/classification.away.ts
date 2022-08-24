import ILeaderboardAway from '../interfaces/ILeaderBoardAway';
import IMatcheAway from '../interfaces/IMatcheAway';
import ISortRank from '../interfaces/ISortRank';

const calculatePoints = (teamAway: IMatcheAway[]) => {
  let points = 0;

  teamAway.map((matche) => {
    if (matche.awayTeamGoals > matche.homeTeamGoals) points += 3;
    if (matche.awayTeamGoals === matche.homeTeamGoals) points += 1;
    return points;
  });
  return points;
};

const calculateGames = (matche: IMatcheAway[]) => matche.length;

const calculateResults = (teamAway: IMatcheAway[]) => {
  let victories = 0;
  let draws = 0;
  let losses = 0;

  teamAway.map((matche) => {
    if (matche.awayTeamGoals > matche.homeTeamGoals) victories += 1;
    if (matche.awayTeamGoals === matche.homeTeamGoals) draws += 1;
    if (matche.awayTeamGoals < matche.homeTeamGoals) losses += 1;

    return { victories, draws, losses };
  });
  return { victories, draws, losses };
};

const calculateGoals = (teamAway: IMatcheAway[]) => {
  let homeGoals = 0;
  let awayGoals = 0;
  let goalsBalance = 0;

  teamAway.map((matche) => {
    if (matche.homeTeamGoals) homeGoals += matche.homeTeamGoals;
    if (matche.awayTeamGoals) awayGoals += matche.awayTeamGoals;
    goalsBalance = awayGoals - homeGoals;
    return { homeGoals, awayGoals, goalsBalance };
  });
  return { homeGoals, awayGoals, goalsBalance };
};

const calculateEfficiency = (teamAway: IMatcheAway[]) => {
  const totalPoints = calculatePoints(teamAway);
  const totalGames = calculateGames(teamAway);
  const result = (totalPoints / (totalGames * 3)) * 100;

  const efficiency = parseFloat(result.toFixed(2));
  return efficiency;
};

const sortRank = (result: ISortRank[]) => {
  result.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    return 0;
  });
};

const createClassification = (teamsAndMatches: ILeaderboardAway[]) => {
  const result = teamsAndMatches.map((matche) => ({
    name: matche.teamName,
    totalPoints: calculatePoints(matche.teamAway),
    totalGames: calculateGames(matche.teamAway),
    totalVictories: calculateResults(matche.teamAway).victories,
    totalDraws: calculateResults(matche.teamAway).draws,
    totalLosses: calculateResults(matche.teamAway).losses,
    goalsFavor: calculateGoals(matche.teamAway).awayGoals,
    goalsOwn: calculateGoals(matche.teamAway).homeGoals,
    goalsBalance: calculateGoals(matche.teamAway).goalsBalance,
    efficiency: calculateEfficiency(matche.teamAway),
  }));

  sortRank(result);

  return result;
};

export default createClassification;
