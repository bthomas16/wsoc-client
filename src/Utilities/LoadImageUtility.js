const ContainsS3Information = function (str) {
  if (str.includes('watchcollectionbucket')) {
    console.log('it DOES contain the watchcollectionbucket')
    return true
  } else {
    console.log('it DOES NOT contain the watchcollectionbucket')
    return false
  }
}

export default { ContainsS3Information }
