export function saveQuantity(quantity) {
    localStorage.setItem("q", quantity);
}
export function getQuantity() {
    return localStorage.getItem("q");
}
export function clearQuantity() {
    var noQuantity = [0, 0, 0, 0, 0, 0]
    localStorage.setItem("q", noQuantity)
}

export function savePrice(price) {
    localStorage.setItem("p", price);
}
export function getPrice() {
    return localStorage.getItem("p");
}
export function clearPrice() {
    var originialPrice = [22, 14, 9, 38, 6, 14]
    localStorage.setItem("p", originialPrice);
}