function checkHasSwearing(field) {
    const swearings = ["fuck", "shit"];

    let hasSwearings = false;

    for (let swearing of swearings) {
        if (field.toLowerCase().includes(swearing)) {
            hasSwearings = true;
            break;
        }
    }

    return hasSwearings;
}


module.exports = {
	checkHasSwearing
};