import { HouseTypes } from "../shared-constants";

export type houseConfigNames = '1 BHK'|'2 BHK'|'3 BHK'|'4 BHK & more'
export type HouseType = houseConfigNames[];
export interface CatergoryType {
  Length: string;
  enabled: boolean;
  Price: string;
  index: number;
  Category: string;
  createdAt: CreatedAt;
  id: string;
  Breadth: string;
  // createdBy: string;
  Height: string;
  Name: string;
  quantity?:number
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface CostType {
  clientId: string;
  labourCost: {
    [name in (typeof HouseTypes)[number]]: {
      labourCount: number;
      cost: number;
    };
  };
  vehicalCost: {
    [name in (typeof HouseTypes)[number]]: {
      volumeinFtcube: number;
      cost: number;
      name: string;
    };
  };
  distanceCostPerKM: number;
  packingCostPerCubeM: number;
}
