import { logos } from '../teams_logo';
export default {
  findCodeLogo (teamName) {
    for (let div of logos) {
      if (div.name === teamName) {
        return div.id;
      }
    }
    return -1;
  }
}
