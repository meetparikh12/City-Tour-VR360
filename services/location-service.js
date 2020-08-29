import locations from "../consts/locations"

export const getListOfToolTips = (location) => {
    if(locations[`${location}`] && locations[`${location}`].tooltips && locations[`${location}`].tooltips.length>0){
        return locations[`${location}`].tooltips
    }
    return [];
}

export const getListOfTransitions = (location) => {
    if(locations[`${location}`] && locations[`${location}`].transitions && locations[`${location}`].transitions.length>0){
        return locations[`${location}`].transitions
    }
    return [];
}
