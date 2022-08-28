import ILeaderboard from '../interfaces/ILeaderBoard';
import MatcheModel from '../database/models/MatcheModel';
import TeamModel from '../database/models/TeamModel';
import createClassification from '../utils/classification.home';
import createClassificationAway from '../utils/classification.away';
import createAllClassification from '../utils/classification.all';
import ILeaderboardAway from '../interfaces/ILeaderBoardAway';

export default class LeaderboardService {
  public getHome = async () => {
    const teamsAndMatches = await TeamModel.findAll({
      include: [
        { model: MatcheModel, as: 'teamHome', where: { inProgress: false } },
      ],
    }) as unknown as ILeaderboard[];

    const leaderboardHome = createClassification(teamsAndMatches);

    return leaderboardHome;
  };

  public getAway = async () => {
    const teamsAndMatches = await TeamModel.findAll({
      include: [
        { model: MatcheModel, as: 'teamAway', where: { inProgress: false } },
      ],
    }) as unknown as ILeaderboardAway[];

    const leaderboardAway = createClassificationAway(teamsAndMatches);

    return leaderboardAway;
  };

  public getAll = async () => {
    const teamsAndMatches = await TeamModel.findAll({
      include: [
        { model: MatcheModel, as: 'teamHome', where: { inProgress: false } },
        { model: MatcheModel, as: 'teamAway', where: { inProgress: false } },
      ],
    }) as unknown as ILeaderboard[];

    const leaderboardAway = createAllClassification(teamsAndMatches);

    return leaderboardAway;
  };
}
