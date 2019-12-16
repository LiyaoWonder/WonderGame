const degreeToRadian = function (degree) {
    let radian = degree * Math.PI * 2 / 360
    return radian
}

const radianToDegree = function (radian) {
    let degree = radian * 360 / 2 / Math.PI
    return degree
}

// const bearing = function (x, y) {
//     return degreeToRadian(Math.atan2(x, y))
// }

const vectorBearing = function (x, y) {
    return radianToDegree(Math.atan2(x, y))
}
