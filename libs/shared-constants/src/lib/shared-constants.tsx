import { IconArmchair, IconDeviceDesktop, IconFridge, IconMicrowave, IconMotorbike, IconToolsKitchen2 } from "@tabler/icons"
import { HouseType } from "./types";

export const HouseTypes:HouseType = ['1 BHK','2 BHK','3 BHK','4 BHK & more',]

export const categories = [
  {name:'Furniture',icon:<IconArmchair />},
  {name:'Large Appliances',icon:<IconFridge />},
  {name:'Small Appliances',icon:<IconMicrowave />},
  {name:'Kitchen Items',icon:<IconToolsKitchen2 />},
  {name:'IT Equipment',icon:<IconDeviceDesktop />},
  {name:'Others',icon:<IconMotorbike />},
  ];
  
