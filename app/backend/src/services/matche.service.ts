import IMatche from '../interfaces/IMatche';
import MatchesModel from '../database/models/MatcheModel';
import TeamModel from '../database/models/TeamModel';

export default class MatcheService {
  public getAll = async (): Promise<IMatche[]> => {
    const matches = await MatchesModel.findAll({
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    // console.log(matches);

    return matches as unknown as IMatche[];
  };

  public create = async (newMatche: IMatche): Promise<IMatche> => {
    // eslint-disable-next-line no-param-reassign
    newMatche.inProgress = true;
    const matches = await MatchesModel.create(newMatche);
    console.log(newMatche);

    return matches as unknown as IMatche;
  };
}
