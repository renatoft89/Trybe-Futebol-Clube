import IMatcheHome from '../interfaces/IMatcheHome';
import ILeaderboard from '../interfaces/ILeaderBoard';
import IMatcheAway from '../interfaces/IMatcheAway';
import ISortRank from '../interfaces/ISortRank';

const calculatePoints = (teamHome: IMatcheHome[], teamAway: IMatcheAway[]) => {
  let points = 0;

  teamHome.map((matche) => {
    if (matche.homeTeamGoals > matche.awayTeamGoals) points += 3;
    if (matche.homeTeamGoals === matche.awayTeamGoals) points += 1;
    return points;
  });

  teamAway.map((matche) => {
    if (matche.awayTeamGoals > matche.homeTeamGoals) points += 3;
    if (matche.awayTeamGoals === matche.homeTeamGoals) points += 1;
    return points;
  });
  return points;
};

const calculateGames = ((teamHome: IMatcheHome[], teamAway: IMatcheAway[]) => {
  const totalMatches = teamHome.length + teamAway.length;
  return totalMatches;
});

const calculateResults = (teamHome: IMatcheHome[], teamAway: IMatcheAway[]) => {
  let victories = 0;
  let draws = 0;
  let losses = 0;

  teamHome.map((matche) => {
    if (matche.homeTeamGoals > matche.awayTeamGoals) victories += 1;
    if (matche.homeTeamGoals === matche.awayTeamGoals) draws += 1;
    if (matche.homeTeamGoals < matche.awayTeamGoals) losses += 1;

    return { victories, draws, losses };
  });

  teamAway.map((matche) => {
    if (matche.awayTeamGoals > matche.homeTeamGoals) victories += 1;
    if (matche.awayTeamGoals === matche.homeTeamGoals) draws += 1;
    if (matche.awayTeamGoals < matche.homeTeamGoals) losses += 1;

    return { victories, draws, losses };
  });
  return { victories, draws, losses };
};

const calculateGoals = (teamHome: IMatcheHome[], teamAway: IMatcheAway[]) => {
  let goalsPro = 0;
  let goalsOwn = 0;
  let goalsBalance = 0;

  teamHome.map((matche) => {
    goalsPro += matche.homeTeamGoals;
    goalsOwn += matche.awayTeamGoals;
    goalsBalance = goalsPro - goalsOwn;

    return { goalsPro, goalsOwn, goalsBalance };
  });

  teamAway.map((matche) => {
    goalsPro += matche.awayTeamGoals;
    goalsOwn += matche.homeTeamGoals;
    goalsBalance = goalsPro - goalsOwn;

    return { goalsPro, goalsOwn, goalsBalance };
  });

  return { goalsPro, goalsOwn, goalsBalance };
};

const calculateEfficiency = (teamHome: IMatcheHome[], teamAway: IMatcheAway[]) => {
  const totalPoints = calculatePoints(teamHome, teamAway);
  const totalGames = calculateGames(teamHome, teamAway);
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

const createAllClassification = (teamsAndMatches: ILeaderboard[]) => {
  const result = teamsAndMatches.map((matche) => ({
    name: matche.teamName,
    totalPoints: calculatePoints(matche.teamHome, matche.teamAway),
    totalGames: calculateGames(matche.teamAway, matche.teamHome),
    totalVictories: calculateResults(matche.teamHome, matche.teamAway).victories,
    totalDraws: calculateResults(matche.teamHome, matche.teamAway).draws,
    totalLosses: calculateResults(matche.teamHome, matche.teamAway).losses,
    goalsFavor: calculateGoals(matche.teamHome, matche.teamAway).goalsPro,
    goalsOwn: calculateGoals(matche.teamHome, matche.teamAway).goalsOwn,
    goalsBalance: calculateGoals(matche.teamHome, matche.teamAway).goalsBalance,
    efficiency: calculateEfficiency(matche.teamHome, matche.teamAway),
  }));

  sortRank(result);

  return result;
};

export default createAllClassification;
