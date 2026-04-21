const shortNames = namesArr => namesArr.map(nameStr => shorter(nameStr));

const shorter = nameStr => {
    let tokenArr = nameStr.trim().split(/\s+/);
    let lastName = tokenArr.pop();
    return tokenArr.map(firstName => firstName.toLowerCase().charAt(0).toUpperCase() + ". ").join("") + lastName.toLowerCase().charAt(0).toUpperCase();
}

export { shortNames };