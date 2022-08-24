import ILeaderboard from '../interfaces/ILeaderBoard';
import MatcheModel from '../database/models/MatcheModel';
import TeamModel from '../database/models/TeamModel';
import createClassification from '../utils/classification.home';

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
}
