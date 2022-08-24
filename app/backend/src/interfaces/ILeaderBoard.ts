interface ILeaderboard {
  id:number;
  teamName:string;
  teamHome: [{
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeamGoals: number;
  }]
}

export default ILeaderboard;
