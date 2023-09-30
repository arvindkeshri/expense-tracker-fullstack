let currentPage = 1;
const itemsPerPage = 5;


const token = localStorage.getItem('token');

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}


window.addEventListener("DOMContentLoaded", () => {

   const decodedToken = parseJwt(token);
   const ispremiumuser = decodedToken.ispremiumuser;
   console.log(decodedToken, "ispremiumuser",  ispremiumuser);
   if(ispremiumuser){
      showPremiumUser();
   }


    // Adding an event listener to the Add button 
    const amount = document.getElementById('amount');
    const description = document.getElementById('description');
    const field = document.getElementById('field');
    const addbutton = document.getElementById('addbutton');
    addbutton.addEventListener('click', (event)=>{
      event.preventDefault();
      const amountValue = amount.value;
      const descriptionValue = description.value;
      const fieldValue = field.value;
      
      const obj = {amount: amountValue, description: descriptionValue, field:fieldValue};
      console.log(obj);
      
      axios
           .post("http://localhost:3000/expense/addExpense", obj, {headers:{"Authorization": token}})
           .then((response)=>{
            console.log("response at axios",response.data);
            if(response.status === 200){
              showExpensesOnScreen(obj);
            }
            console.log(response.data);
           })
           .catch((err)=>{
                    console.log("Error Saving to database", err);
           })
    })

    //fetching and displaying expenses when the page loads
    
    axios
      .get("http://localhost:3000/expense/getExpenses",{headers: {"Authorization": token}})
      .then((res) => {
         console.log(res.data); //this contains 
        // res.data.expenses.forEach(expense => {
        //   showExpensesOnScreen(expense);
          
        // });

        const start = (page-1)*itemsPerPage;
        const end = start + itemsPerPage;

        for(let i=start; i<Math.min(end, obj.length); i++){
        const expense = obj[i];

      })
      .catch((err) => {
       
      });
  });

//   function showExpensesOnScreen(obj) {
//     const parentElem = document.getElementById("list");
//     const childElem = document.createElement("li");
//     childElem.textContent =`${obj.amount} Rupees for ${obj.description} in category ${obj.field}  `;
//     console.log(obj.id);
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.className = "delete-button";
//     deleteButton.onclick = () => {
//       axios
//         .delete(`http://localhost:3000/expense/deleteExpense/${obj.id}`, {headers: {"Authorization": token}})
//         .then(() => {
//           parentElem.removeChild(childElem);
//           console.log("Expense deleted successfully");
//         })
//         .catch((err) => {
//           console.log("There is an error deleting expense", err);
//         });
//     };

//     childElem.appendChild(deleteButton);
//     parentElem.appendChild(childElem);
//     document.getElementById("form").reset();
//   }






function showExpensesOnScreen(obj){

        const tableBody = document.getElementById("list")
        const row = document.createElement('tr');          //table row

        const amountData = document.createElement('td');    //table data
        amountData.textContent = `${obj.amount}`;
        row.appendChild(amountData);

        const descriptionData = document.createElement('td');    
        descriptionData.textContent = `${obj.description}`;
        row.appendChild(descriptionData);

        const fieldData = document.createElement('td');    
        fieldData.textContent = `${obj.field}`;
        row.appendChild(fieldData);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.onclick = () => {
        axios
        .delete(`http://localhost:3000/expense/deleteExpense/${obj.id}`, {headers: {"Authorization": token}})
        .then(() => {
         // parentElem.removeChild(childElem);
         tableBody.removeChild(row);
          console.log("Expense deleted successfully");
        })
        .catch((err) => {
          console.log("There is an error deleting expense", err);
        });
    };

        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
        document.getElementById("form").reset();
  }



  function showPremiumUser(){
    const premiumButton = document.getElementById('premiumbutton');
    premiumButton.style.display = 'none';
    const leaderboardBtn = document.getElementById('leaderboardbtn');
    leaderboardBtn.style.display = 'inline-block';
    document.getElementById('premiumuser').innerHTML = 'You are a Premium User';

    leaderboardBtn.onclick = async()=>{
      try{
      const leaderboardArray = await axios.get('http://localhost:3000/premium/showLeaderboard', { headers: { "Authorization": token } })

      console.log("leaderboardArray>>>>>>>>>>>>>>>>>>>>>",leaderboardArray.data);
      const leaderboardElem = document.getElementById('leaderboardlist')
      leaderboardElem.innerHTML = '';   //clear existing list
      leaderboardArray.data.forEach((expense)=>{

        showRanking(expense);
        // childElem = document.createElement('li');
        // childElem.textContent = `Name ${expense.name} Total Expenses - ${expense.total??0}`;
        // console.log(childElem.textContent);
        // leaderboardElem.appendChild(childElem);
         }) 
       }catch(err){
      console.log('Error fetching Leaderboard', err);
      }
  
     }
  }
    function showRanking(obj){
        
        const table = document.getElementById("leaderboardtable")
        const row = document.createElement('tr');          
    
        const rankData = document.createElement('td');    
        amountData.textContent = `${obj.rank}`;
        row.appendChild(rankData);
    
        const totalData = document.createElement('td');    
        descriptionData.textContent = `${obj.total}`;
        row.appendChild(totalData);
    
        const nameData = document.createElement('td');    
        fieldData.textContent = `${obj.name}`;
        row.appendChild(nameData);

        table.appendChild(row);

    }