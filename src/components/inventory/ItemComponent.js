import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { 
    setInvItemSelect, 
    unselectShopItems, 
    setShopItemSelect, 
    setCraftableItemSelect, 
    unselectCraftableItems 
} from '../../actions/itemsActions'
import firstLetterUpperCase from '../../logic/firstLetterUpperCase'
import { ReactComponent as Coin } from '../../resources/icons/coin.svg'

function ItemComponent(props) {
    
    // If item has data & isn't of type 'Empty' (for shop items) render item
    if (props.data && props.data.type !== 'Empty') {

        // Destructure from props
        const { 
            data: {
                name,
                displayedName,
                destination,
                rarity,
                stats,
                bonuses,
                goldValue,
                level,
                icon,
                isSelected,
                key,
                type,
                amount,
                classes
            }, 
            equippedItems, 
            shopItems, 
            craftableItems,
            setInvItemSelect, 
            unselectShopItems, 
            setShopItemSelect,
            setCraftableItemSelect,
            unselectCraftableItems,
            renderedInGame 
        } = props

        const currentItem = props.data

        // Item Handle Click
        const handleClick = () => {
            // If this Item is rendered in Game.js, don't do anything
            if(renderedInGame) return
            // If clicked item is in the Inventory, set its isSelected value to the opposite
            if (destination === 'Inventory') {
                setInvItemSelect(key)
            }
            // If clicked item is in the Shop, only one can be selected at the same time
            if (destination === 'Shop') {
                const selectedShopItems = shopItems.filter(item => item.isSelected)
                
                const cond1 = selectedShopItems.length === 1 && key === selectedShopItems[0].key
                const cond2 = selectedShopItems.length === 0
                
                // If (condition 1) there is one selected item, and it's the clicked one,
                // or if (condition 2) there are no selected items => just set items select to the opposite,
                // else unselect all shop items, and select the clicked one
                if(cond1 || cond2) {
                    setShopItemSelect(key)
                } else {
                    unselectShopItems()
                    setShopItemSelect(key)                        
                }
            }
            // Do the similiar thing for Crafting Item as for Shop Item
            if(destination === 'Crafting') {
                let selectedCraftableItems = []

                // Loop through every craftableItem and add to array the selected one(s),
                // along with the levelType and rarityType index that the item is located in 
                craftableItems.forEach(levelType => {
                    levelType.forEach(rarityType => {
                        rarityType.forEach(item => {
                            if(item.item.isSelected) selectedCraftableItems.push(item.item)
                        })
                    })
                })

                const cond1 = selectedCraftableItems.length === 1 && key === selectedCraftableItems[0].key
                const cond2 = selectedCraftableItems.length === 0

                if (cond1 || cond2) {
                    setCraftableItemSelect(key)
                } else {
                    unselectCraftableItems()
                    setCraftableItemSelect(key)
                }
            }
        }

        // Checks
        const isEquipped = destination === 'Equipped' ? true : false
        const isDrop = type === 'drop' ? true : false
        const hasDropFunctionality = isDrop && (destination === 'Shop' || destination === 'Inventory') ? true : false

        // Set Classes - first push items into array, 
        // then join them into single string with with space between them
        const setClasses = () => {
            const classesArray = []

            if(rarity) classesArray.push(rarity.toLowerCase())
            if(isSelected) classesArray.push('selected')
            if(isDrop) classesArray.push('drop')
            if(!hasDropFunctionality) classesArray.push('no-functionality')
            if(amount) classesArray.push('has-amount')
            if(classes) {
                classes.forEach(item => classesArray.push(item))
            }


            return classesArray.join(' ')
        }

        // COMPARISON
        const comparison = (() => {
            
            // If Item is equipped, or its Drop Item break out of this function
            if(isEquipped || isDrop) return {}

            // Compared Item (compare current Item with the equipped item of same name, e.g. bow with bow)
            const comparedItem = equippedItems.filter(item => item.name === name)[0]
    
            // Single Value Comparison
            const compareSingle = (compared, current) => {
                const diff = current - compared
    
                if (diff > 0) return { value: '+' + Math.abs(diff), color: 'green' }
                else if (diff < 0) return { value: '-' + Math.abs(diff), color: 'red' }
                else if (diff === 0) return { value: diff, color: 'yellow' }
            }
    
            // Compare Stat and Level
            const comparedStat = compareSingle(comparedItem.stats.value, currentItem.stats.value)
            const comparedLevel = compareSingle(comparedItem.level, currentItem.level)
    
            // Compare Bonuses
            const comparedBonuses = (() => {
                const compBonuses = comparedItem.bonuses
                const currBonuses = currentItem.bonuses
                let diffArray = []
    
                // Loop through current and nested bonuses,
                currBonuses.forEach(current => {
                    const currName = current.name
                    const currVal = current.value
    
                    compBonuses.forEach(compared => {
                        const compName = compared.name
                        const compVal = compared.value
    
                        // if they match, calculate the diff and push to diffArray
                        if (currName === compName) {
                            const diff = currVal - compVal
    
                            if (diff > 0) diffArray.push({ value: '+' + Math.abs(diff), color: 'green' })
                            else if (diff < 0) diffArray.push({ value: '-' + Math.abs(diff), color: 'red' })
                            else if (diff === 0) diffArray.push({ value: diff, color: 'yellow' })
                        }
                    })
                })
    
                return diffArray
            })()

            // Final Return
            return { 
                level: comparedLevel, 
                stat: comparedStat, 
                bonuses: comparedBonuses 
            }
        })()

        // Item Name
        const itemName = () => {
            if (isDrop) {
                // make the first letter of every word upper case
                const nameUpper = firstLetterUpperCase(name)
                return (
                    <div className='name-container'>
                        <p id='name'>{nameUpper}</p>
                    </div>
                )
            } else {
                const nameVal = `${rarity} ${displayedName} (${level})`
                const comparedValue = comparison.level ? comparison.level.value : null
                const style = comparison.level ? { color: comparison.level.color } : null
                return (
                    <div className='name-container'>
                        <p id='name'>{nameVal}</p>
                        <p style={style}>{comparedValue}</p>
                    </div>
                )
            } 
        }

        // Item Stat
        const itemStat = () => {
            if(isDrop) return null
            const comparedValue = comparison.stat ? comparison.stat.value : null
            const style = comparison.stat ? { color: comparison.stat.color } : null
            return (
                <div className='stat-container'>
                    <p>{stats.statName + ': ' + stats.value}</p>
                    <p style={style}>{comparedValue}</p>
                </div> 
            )
        }

        // Item Bonuses
        const itemBonuses = isDrop ? null : bonuses.map((bonus, i) => {
            const name = bonus.name.charAt(0).toUpperCase() + bonus.name.slice(1)
            const comparedValue = comparison.bonuses ? comparison.bonuses[i].value : null
            const style = comparison.bonuses ? { color: comparison.bonuses[i].color } : null
            return (
                <div key={i} className='bonus-container'>
                    <p>{name + ': ' + bonus.value}</p>
                    <p style={style}>{comparedValue}</p>
                </div>
            )
        })

        const itemValue = goldValue ? <div className='gold-value'>
            <p className='value'>{goldValue}</p>
            <div className='gold-icon'><Coin /></div>
        </div> : null

        // RENDER
        return ( 
            <li className={`item-container ${setClasses()}`}>
                <div className='item' onClick={handleClick} >

                    {/* Icon */}
                    <div className='item-icon'>
                        { icon.render() } 
                    </div>

                    {/* Info */}
                    <div className='stats'>
                        { itemName() }
                        { itemStat() }
                        { itemBonuses ? <div className='bonuses'>{itemBonuses}</div> : null }
                        { itemValue }
                    </div>

                    {/* Drop Amount - only for drop items */}
                    { amount ? <p className='drop-amount'>{amount}</p> : null }
                </div>
            </li>
        )
    }
    // or render an empty item 
    return <li className='item-container'></li>
}

ItemComponent.propTypes = {
    equippedItems: PropTypes.array.isRequired,
    shopItems: PropTypes.array.isRequired,
    craftableItems: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    equippedItems: state.items.equippedItems,
    shopItems: state.items.shopItems,
    craftableItems: state.items.craftableItems
})

export default connect(mapStateToProps, { 
    setInvItemSelect, 
    unselectShopItems, 
    setShopItemSelect,
    setCraftableItemSelect,
    unselectCraftableItems 
})(ItemComponent)
