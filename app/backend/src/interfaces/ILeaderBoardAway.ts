interface ILeaderboardAway {
  id:number;
  teamName:string;
  teamAway: [{
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeamGoals: number;
  }]
}

export default ILeaderboardAway;
