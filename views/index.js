
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");
const nameField = document.getElementById("nameField");
const title = document.getElementById("title");
const err = document.getElementById("errMessage");

//add click functions on both

signinBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");

    err.style.display = "none";

    const email = inputEmail.value;
    const password = inputPassword.value;
    const obj = {email, password};

    if(!email || !password)return;

    try{
        axios.post('http://localhost:3000/signin', obj)
            .then(res=>{
                console.log('Signin successful', res.data);
            })
            .catch(err=>{
                console.log("Error axios:", err.response);
                if(err.response && err.response.status === 400 && err.response.data === 'Email already registered'){
                       const modal = document.getElementById("modal");
                       const modalmsg = document.getElementById("modalmsg");
                       modal.style.display = "block";
                       modalmsg.textContent = `${email} is already registered with Catch`;
                       
                 }else {
                        console.error('Signin failed', err);
                 }
                
            })
        
        }
        catch(err){console.log("Error during signin", err)}
}
    





signupBtn.onclick = async function(){
    nameField.style.maxHeight = "65px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");

    err.style.display = "none";

    const name = inputName.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
    const obj = {name, email, password};

    if(!name || !email || !password)return;


    try{
    axios.post('http://localhost:3000/signup', obj)
        .then(res=>{
            console.log('Signup successful', res.data);
        })
        .catch(err=>{
            console.log("Error axios:", err.response);
            if(err.response && err.response.status === 400 && err.response.data === 'Email already registered'){
                   const modal = document.getElementById("modal");
                   const modalmsg = document.getElementById("modalmsg");
                   modal.style.display = "block";
                   modalmsg.textContent = `${email} is already registered with Catch`;
                   
             }else {
                    console.error('Signup failed', err);
             }
            
        })
    
    }catch(err){
        console.log("Error during signup", err);
    }
}

function closeModal(){
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    const form = document.getElementById("form");
    form.reset();
}
