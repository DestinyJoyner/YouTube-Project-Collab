
 const darkStyles = {
    backgroundColor: 'black',
    color: 'aqua',
    border: '2px solid red'
}

//  function to add commas to string number
function convertNumber(num) {
    return num
      .split(``)
      .reverse()
      .join(``)
      .match(/.{1,3}/g)
      .join(`,`)
      .split(``)
      .reverse()
      .join(``);
  }

//   function to convert string date into mm//dd//yy format
function convertDate(str) {
    let date = str.slice(2, 10).split("-");
    date.push(date[0]);
    date.shift();
    return date.join("/");
  }



export {
    darkStyles,
    convertNumber,
    convertDate,
}