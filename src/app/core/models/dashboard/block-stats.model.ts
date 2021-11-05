
export class BlockStats{
    statName: string;
    statData: number;

    constructor(init?:Partial<BlockStats>) {
        Object.assign(this, init);
      }
}