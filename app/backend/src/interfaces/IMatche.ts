interface IMatche {
  id: number;
  homeTeam:number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: { object: string };
  temAway: { object: string };
}

export default IMatche;
