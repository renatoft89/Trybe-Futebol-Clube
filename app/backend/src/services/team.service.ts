import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  public getAll = async (): Promise<ITeam[]> => { // getAll retorna uma promise de times com interface ITeam id: number teamName: string
    const teams = await TeamModel.findAll(); // import model de Times findAll do sequelize buscando todos os times.

    return teams;
  };

  public getById = async (id: number): Promise<ITeam> => {
    const teams = await TeamModel.findByPk(id);

    return teams as ITeam;
  };
}
