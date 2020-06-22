import { Injectable } from '@nestjs/common';

export interface FactionDTO {
  id: string;
  name: string;
  ships: number[];
}

@Injectable()
export class FactionService {
  private factions: FactionDTO[] = [
    {
      id: '1',
      name: 'Alliance to Restore the Republic',
      ships: [1, 2, 3, 4, 5],
    },
    {
      id: '2',
      name: 'Galactic Empire',
      ships: [6, 7, 8],
    },
  ];

  public getFaction(id: string) {
    return this.factions.find((faction) => faction.id === id);
  }

  public getRebels() {
    return this.getFaction('1');
  }

  public getEmpire() {
    return this.getFaction('2');
  }

  public assignShip(factionId: string, shipId: number) {
    const factionIndex = this.factions.findIndex((faction) => faction.id === factionId);
    this.factions[factionIndex].ships.push(shipId);
  }
}
