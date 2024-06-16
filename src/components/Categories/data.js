import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp } from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";

const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach.'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills.'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern.'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside.'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool.'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island.'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is cloase to a lake.'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activities.'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a castle.'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities.'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property contains snows.'
    },
];
export { categories };