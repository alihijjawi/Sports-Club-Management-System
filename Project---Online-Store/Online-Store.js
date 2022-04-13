//ALL
export const promocodes = ["YOUSS1", "YASS02", "MIRAPS", "MISTO2", "HAZ123", "ALIHIJ"]
export const fixed_item_price = [22, 14, 9, 38, 6, 14]
export let q = [0, 0, 0, 0, 0, 0]
export let item_price = [22, 14, 9, 38, 6, 14]

export function applyDiscount(){
    for (let j = 0; j<item_price.length; j++) {
        item_price[j] = 0.9*item_price[j]
    }
  }
  
//if(sessionOn) {applyDiscount();}

