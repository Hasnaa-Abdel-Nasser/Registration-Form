
let input = document.getElementsByTagName('input')
let message = document.getElementsByTagName('p');
let register = document.getElementById('register');
let gender = document.getElementsByName('gender');
let addUser = false;
let users = JSON.parse(window.localStorage.getItem('Users'))??[];

let [name1 , username , email , password , confPassword ,genderClick] = [false,false,false,false,false,''];
// Regex in Page
let [regInvalidName , regUsername , regEmail , goodPass , poorPass,strongPass] = [/[0-9\d\W]/ , 
                                                 /^\S(?=.*[a-zA-Z])(?=.*[0-9])\S{3,10}$/ , 
                                                 /^[a-z]{2,20}[0-9]{2,20}@(gmail|yahoo)\.(com)$/,
                                                 /^(?=.*[A-Z!@#$&*])(?=.*[0-9!@#$&*])(?=.*[a-z!@#$&*]).{8,20}$/,
                                                 /^[a-zA-Z0-9!@#$&*]{8,20}$/,
                                                 /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$/
                                                ];

function Name(){
    let result = input[0].value.match(regInvalidName);
    name1 = false;
    if(result){
        messageProcessing( 0 , '* must only enter alphabets' , 'red')
        console.log(false);
    }else{
        if(input[0].value.length == 0){
            messageProcessing(0 , '* field is required' , 'red')
        }else if(input[0].value.length > 20 || input[0].value.length < 3){
            messageProcessing(0 , '*must be more than 3 and less than 20 characters' , 'red')
        }else{
            messageProcessing(0 , 'success' , '#248b8d')
            name1 = true;
        }
    }
    Submit()

}

function Username(){
    let result = input[1].value.match(regUsername);
    username = false;
    if(result){
        messageProcessing(1 , 'success' , '#248b8d')
        username = true;
    }else{
        username = false;
        if(input[1].value.length == 0){
            messageProcessing(1 , '* field is required' , 'red')

        }else{
            messageProcessing(1 , '* must be more than 3 and less than 10 characters & numbers only' , 'red')
        }
    }
    Submit()
}

function Email(){
    let result = input[2].value.match(regEmail);
    email = false;
    if(result){
        messageProcessing(2 , 'success' , '#248b8d')
        email = true;
    }else{
        messageProcessing(2 , '* Invalid Email' , 'red')
    }
    Submit()
}

function Password(){
    let result = input[3].value.match(strongPass);
    message[3].style.opacity = '1';
    password=true;
    if(result){
        messageProcessing(3 , '* wow, strong password' , '#a68deb')
    }else{
        result = input[3].value.match(goodPass);
        if(result){
            messageProcessing(3 , '* very good password' , '#ecbb6b')
        }else{
            result = input[3].value.match(poorPass);
            if(result){
                messageProcessing(3 , '* poor password' , 'rgb(215 89 0)')
            }else{
                messageProcessing(3 , '* Invalid password minimum 9 & maximum 20' , 'red')
                password=false;
            }
        }
    }
    Submit()
}

function Confirm(){
    confPassword=false;
    message[4].style.opacity = '1';
    if(input[3].value !== input[4].value || input[4].value == ''){
        messageProcessing(4 , '* Invalid password' , 'red')
    }else{
        messageProcessing(4 , 'success' , '#248b8d')
        confPassword=true;
    }
    Submit()
}

function Gender(){
    genderClick = '';
    if(!gender[0].checked && !gender[1].checked){
        messageProcessing(5 , "Please select a gender" , 'red');
    }else{
        messageProcessing(5 , "success" , 'white');
        genderClick = (gender[0].checked)?input[5].value:input[6].value;
    }
    Submit()
}

function Submit(){
    if(name1&&username&&email&&password&&confPassword&& (gender[0].checked || gender[1].checked)){
        register.style.cssText= `background-color: #248b8d;
                                color: #fff;
                                cursor: pointer;`;
        addUser = true;
    }else{
        addUser = false;
        register.style.cssText= `background-color: #eee;
                                color: #fff;
                                cursor: not-allowed;`;
    }
}

function messageProcessing(index, data , color='red'){
    if(data === 'success'){
        message[index].style.opacity = '0';
        input[index].style.boxShadow=`0px 0px 5px ${color}`;
        message[index].innerHTML = 'success';
        input[index].style.border='none'
    }else{
        message[index].style.opacity = '1';
        message[index].style.color = `${color}`;
        input[index].style.boxShadow=`0px 0px 5px ${color}`;
        message[index].innerHTML = data;
        input[index].style.border='none'
    } 
}

register.addEventListener('click',()=>{
    if(addUser){
        users.push({
            name:input[0].value,
            email:input[2].value,
            password:input[3].value,
        })
        window.localStorage.setItem('Users' ,  JSON.stringify(users));
        alert('Success Register :)')
    }else{
        Name()
        Username()
        Email()
        Password()
        Confirm()
        Gender()
    }
})
//To View Password 

input[3].addEventListener('mouseover',()=>{
    input[3].type = 'text';
})
input[3].addEventListener('mouseleave',()=>{
    input[3].type = 'password';
})
input[4].addEventListener('mouseover',()=>{
    input[4].type = 'text';
})
input[4].addEventListener('mouseleave',()=>{
    input[4].type = 'password';
})

