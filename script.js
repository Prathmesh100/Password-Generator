const inputSlider= document.querySelector('.slider');
const lengthDisplay=document.querySelector('[data-lengthNumber]'); //custom attribute
const passwordDisplay=document.querySelector('[data-passwordDisplay]'); //custom attribute
const copyMessage=document.querySelector('[data-copyMessage]'); //custom
const copyBtn=document.querySelector('[data-copy]'); //custom
const uppercaseCheck=document.querySelector('#uppercase'); //custom attribute
const lowercaseCheck=document.querySelector('#lowercase'); //custom
const numberCheck=document.querySelector('#numbers'); //custom attribute
const symbolCheck=document.querySelector('#symbols'); //custom attribute
const generateBtn=document.querySelector('.generate-btn'); //generate
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const indicator=document.querySelector('[data-indicator]');

let password="";
 let passwordLength=10;
 let checkCount=0;

 const symbol='~`@#$%^&*()-+={}[]|:;"<,>.?/';
 handleslider();
//  set strength circle grey
setIndicator("#ccc");
function handleslider()
{
    inputSlider.value=passwordLength;
    lengthDisplay.innerText= passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)) + "% 100%";
}

function setIndicator(color)
{
    indicator.style.backgroundColor=color; 
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getRndinteger(min,max)
{
    return Math.floor(Math.random()*(max-min)+min);
}

function generateRandomNumber(){
    return getRndinteger(0,9);
}

function generateLowercase()
{
    return String.fromCharCode(getRndinteger(97,123));
}

function generateUppercase()
{
    return String.fromCharCode(getRndinteger(65,91));
}
 function generateSymbol()
 {
    const randNum= getRndinteger(0,symbol.length);
    return symbol.charAt(randNum);
 }

 function calcStrength()
 {
    let hasUpper= false;
    let hasLower= false;
    let hasNum=false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasSym || hasNum) && passwordLength>=8) setIndicator("#0f0");
    else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength>=6) setIndicator("#ff0");
    else setIndicator("#f00");
 }

 async function copyContent()
 {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMessage.innerText="Copied";
    }
    catch(e)
    {
        copyMessage.innerText="Failed";
    }
    // span visibility
    copyMessage.classList.add("active");
    setTimeout( () =>
        {
            copyMessage.classList.remove("active");
        },2000);
 }

 

 inputSlider.addEventListener('input',(e)=>
 {
    passwordLength=e.target.value;
    handleslider();
    console.log(passwordLength);
 });


copyBtn.addEventListener('click',(e) =>
{
    if(passwordDisplay.value) 
    copyContent();
});

function handleCheckBoxChange()
 {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked) checkCount++;
    });

    // condition
    if(passwordLength<checkCount){ 
        passwordLength=checkCount;
        handleslider();
    }
 }


 allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
 })

function shufflePassword(array)
{
    // fisher Yate method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener('click',() =>
{
    // none of checkbox selected
    if(checkCount==0) return;
    if(passwordLength < checkCount)
    {
        passwordLength=checkCount;
        handleslider();
    }
    console.log("starting journey");
    // new password
    password="";
    //put stuff mentioned in checkbox
    // if(uppercaseCheckbox.checked) 
    // {
    //     password+=generateUppercase();
    // }
    // if(lowercaseCheck.checked)
    // {
    //     password+=generateLowercase();
    // }
    // if(numberCheck.checked)
    // {
    //     password+=generateNumber();

    // }
    // if(symbolCheck.checked)
    // {
    //     password+=generateSymbol;
    // }

    let funcArr=[];
    if(uppercaseCheck.checked) 
    {
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked)
    {
        funcArr.push(generateLowercase);
    }
    if(numberCheck.checked)
    {
        funcArr.push(generateRandomNumber);

    }
    if(symbolCheck.checked)
    {
        funcArr.push(generateSymbol);
    }
    // compulsory
    for(let i=0;i<funcArr.length;i++)
    {
        password+=funcArr[i]();
    }
    console.log("compulsary addition done");

    // remaining
    for(let i=0;i<passwordLength-funcArr.length;i++)
    {
        let randIndex = getRndinteger(0,funcArr.length);
        password+=funcArr[randIndex]();
    }
    console.log("remaing addition done");

    // shuffled password
    password= shufflePassword(Array.from(password));
    console.log("shuffle done");
     
    passwordDisplay.value=password;

    // strength
    calcStrength();
    console.log("Ui addition done");

});