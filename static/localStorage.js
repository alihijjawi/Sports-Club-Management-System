export function saveQuantity(quantity) {
    localStorage.setItem("q", JSON.stringify(quantity));
}
export function getQuantity() {
    var quantity = localStorage.getItem("q");
    if (quantity==null) return [0, 0, 0, 0, 0, 0];
    return Array.from(JSON.parse(quantity), x=>parseFloat(x));
}
export function clearQuantity() {
    return localStorage.removeItem("q");
}

export function savePrice(price) {
    localStorage.setItem("p", JSON.stringify(price));
}
export function getPrice() {
    var price = localStorage.getItem("p");
    if(price == null) return [22, 14, 9, 38, 6, 14];
    return Array.from(JSON.parse(price), x=>parseFloat(x));
}
export function clearPrice() {
    return localStorage.removeItem("p");
}