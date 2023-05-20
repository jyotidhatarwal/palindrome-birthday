const inputDate = document.querySelector("#input-date");
const showButton = document.querySelector("#btn-show");
const outputMessage = document.querySelector("#output-message");


function reverseString(str){
    var listOfCharacter = str.split("");
    var reverseListOfCharacter = listOfCharacter.reverse();
    var reversedString = reverseListOfCharacter.join("");
    return reversedString;
}

function isPalindrome(str){
    if(str === reverseString(str)){
        return true;
    }
    return false;
}

function convertNumberDateToStringDate(date){
    var dateString = {
        day: "",
        month: "",
        year: ""
    };

    if(date.day < 10){
        dateString.day = "0" + date.day;
    }else{
        dateString.day = date.day.toString();
    }
    if(date.month < 10){
        dateString.month = "0" + date.month;
    }else{
        dateString.month = date.month.toString();
    }
    dateString.year = date.year.toString();
    return dateString;
}

function listAllVariationOfDate(date){
    date = convertNumberDateToStringDate(date);
    const ddmmyyyy = date.day + date.month + date.year;
    const mmddyyyy = date.month + date.day + date.year;
    const yyyymmdd = date.year + date.month + date.day;
    const ddmmyy = date.day + date.month + date.year.slice(-2);
    const mmddyy = date.month + date.day + date.year.slice(-2);
    const yymmdd = date.year.slice(-2) + date.month + date.day;

    const listOfvariation = [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
    return listOfvariation;
}

function checkPalindromeForAllFormats(date){
    var palindrome = false;
    const listOfvariation = listAllVariationOfDate(date);
    for(var i=0;i<listOfvariation.length;i++){
        if(isPalindrome(listOfvariation[i])){
            palindrome = true;
            break;
        }
    }
    return palindrome;
}

function leapYear(year){
    var isLeapYear = false;
    if(year % 400 === 0){
        isLeapYear = true;
    }else if(year % 100 === 0){
        isLeapYear = false;
    }else if(year % 4 === 0){
        isLeapYear = true;
    }
    return isLeapYear;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var numberOfDaysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(leapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }else{
        if(day > numberOfDaysInMonth[month -1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year:year
    }
}

function nextPalindromeDate(date){
    var counter =0;
    var nextDate = getNextDate(date);
    while(true){
        counter++;
        var palindrome = checkPalindromeForAllFormats(nextDate);
        if(palindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter,nextDate];
}


var date = {
    day: 22,
    month: 22,
    year:2222
}

function clickHandler(){
    var birthdayStr = inputDate.value;

    if(birthdayStr !== ''){
        var formatedDate  = birthdayStr.split("-");
        var date = {
            day: Number(formatedDate[2]),
            month: Number(formatedDate[1]),
            year: Number(formatedDate[0])
        };
        var isPalindrome = checkPalindromeForAllFormats(date);
        if(isPalindrome){
            showMessage("Yay! 🥳 your birthday is a Palindrome","Green");
        }else{
            var [counter,nextDate] = nextPalindromeDate(date);
            showMessage(`Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days 🤪`,"red");
        }
    }else{
        showMessage("Please select a date from the date picker","black");
    }
}

function showMessage(message,color){
    outputMessage.style.color = color;
    outputMessage.innerText = message;
}

showButton.addEventListener("click",clickHandler);