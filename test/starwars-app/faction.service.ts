import { Injectable } from '@nestjs/common'
import { ResolvedGlobalId } from '../../src/nestjs-relay-tools'

export interface FactionDTO {
  id: ResolvedGlobalId
  name: string
  ships: number[]
}

@Injectable()
export class FactionService {
  private factions: FactionDTO[] = [
    {
      id: { type: 'Faction', id: '1' },
      name: 'Alliance to Restore the Republic',
      ships: [1, 2, 3, 4, 5]
    },
    {
      id: { type: 'Faction', id: '2' },
      name: 'Galactic Empire',
      ships: [6, 7, 8]
    }
  ]

  public getFaction(id: string) {
    return this.factions.find(faction => faction.id.id === id)
  }

  public getRebels() {
    return this.getFaction('1')
  }

  public getEmpire() {
    return this.getFaction('2')
  }
}
