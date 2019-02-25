// category = array category

// returns array of autocomplete results
import Brands from '../AutoCompleteCollections/Brands.js'
import Movements from '../AutoCompleteCollections/Movements'
// import Straps from '../AutoCompleteCollections/Straps'
// import WatchNames from '../AutoCompleteCollections/WatchNames'

const AutoComplete = function (category, searchTerm) {
    let Category = getCategory(category)
    return Category.filter(item => item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
}

const getCategory = function (category) {
    let value;
    switch (category) {
        case 'Brands':
            value = Brands
            break
        case 'Movements':
            value = Movements
            break;
        // case 'Straps':
        //     value = Movements
        //     break;
        // case 'WatchNames':
        //     value = Movements
        //     break;
        default:
            value = Brands
            break
        

    }
    return value
}

export default { AutoComplete }