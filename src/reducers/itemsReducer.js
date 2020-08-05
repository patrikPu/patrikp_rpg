import icons from '../data/icons'
import emptyBonuses from '../data/emptyBonuses'
import {

} from '../actions/types'

const initialState = {
    equippedItems: [
        { type: "Helmet", rarity: "Common", stats: { statName: "Armor", value: 7 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.helmet, key: 0 },
        { type: "Chestplate", rarity: "Common", stats: { statName: "Armor", value: 10 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.chestplate, key: 1 },
        { type: "Pants", rarity: "Common", stats: { statName: "Armor", value: 8 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.pants, key: 2 },
        { type: "Gloves", rarity: "Common", stats: { statName: "Armor", value: 6 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.gloves, key: 3 },
        { type: "Boots", rarity: "Common", stats: { statName: "Armor", value: 6 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.boots, key: 4 },
        { type: "Sword", rarity: "Common", stats: { statName: "M-DMG", value: 125 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.sword, key: 5 },
        { type: "Necklace", rarity: "Common", stats: { statName: "HP", value: 175 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.necklace, key: 6 },
        { type: "Earrings", rarity: "Common", stats: { statName: "HP", value: 175 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.earrings, key: 7 },
        { type: "Ring", rarity: "Common", stats: { statName: "Crit. chance", value: 10 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.ring, key: 8 },
        { type: "Belt", rarity: "Common", stats: { statName: "Crit. chance", value: 10 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.belt, key: 9 },
        { type: "Shield", rarity: "Common", stats: { statName: "Block chance", value: 15 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.shield, key: 10 },
        { type: "Bow", rarity: "Common", stats: { statName: "R-DMG", value: 125 }, bonuses: emptyBonuses, goldValue: 10, level: 0, destination: "Equipped", isSelected: false, imgSrc: icons.bow, key: 11 },
    ],
    invItems: [],
    shopItems: [
        { type: "Empty", key: 0 },
        { type: "Empty", key: 1 },
        { type: "Empty", key: 2 },
    ],
}

export default (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
}