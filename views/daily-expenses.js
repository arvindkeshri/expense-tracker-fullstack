const token = localStorage.getItem('token');
window.addEventListener("DOMContentLoaded", () => {
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
      //const userId = 1;
      const obj = {amount: amountValue, description: descriptionValue, field:fieldValue};
      console.log(obj);
      //sending this object
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
         console.log(res.data);
      //   for (var i = 0; i < res.data.length; i++)
      //     showExpensesOnScreen(res.data[i]);
        res.data.expenses.forEach(expense => {
          showExpensesOnScreen(expense);
          
        });

      })
      .catch((err) => {
       
      });
  });

  function showExpensesOnScreen(obj) {
    const parentElem = document.getElementById("list");
    const childElem = document.createElement("li");
    childElem.textContent =`${obj.amount} for ${obj.description} in category ${obj.field}  `;
    console.log(obj.id);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      axios
        .delete(`http://localhost:3000/expense/deleteExpense/${obj.id}`, {headers: {"Authorization": token}})
        .then(() => {
          parentElem.removeChild(childElem);
          console.log("Expense deleted successfully");
        })
        .catch((err) => {
          console.log("There is an error deleting expense", err);
        });
    };

    childElem.appendChild(deleteButton);
    parentElem.appendChild(childElem);
    document.getElementById("form").reset();
  }































  
// window.addEventListener("DOMContentLoaded", () => {
//   // Adding an event listener to the Add button 
//   const amount = document.getElementById('amount');
//   const description = document.getElementById('description');
//   const field = document.getElementById('field');
//   const addbutton = document.getElementById('addbutton');
//   addbutton.addEventListener('click', (event)=>{
//     event.preventDefault();
//     const amountValue = amount.value;
//     const descriptionValue = description.value;
//     const fieldValue = field.value;
//     const obj = {amount: amountValue, description: descriptionValue, field:fieldValue};
//     console.log(obj);
//     //sending this object
//     axios
//          .post("http://localhost:3000/userid/expenseid", obj)
//          .then((response)=>{
//           console.log(response.data);
//           if(response.status === 200){
//             showExpensesOnScreen(obj);
//           }
//           console.log(response.data);
//          })
//          .catch((err)=>{
//                   console.log("Error Saving to database", err);
//          })
//   })

//   //fetching and displaying expenses when the page loads
//   const token = localStorage.getItem('token');
//   axios
//     .get("http://localhost:3000/userid/expenses",{headers: {"Authorization": token}})
//     .then((res) => {
//     //  console.log(res);
//     //   for (var i = 0; i < res.data.length; i++)
//     //     showExpensesOnScreen(res.data[i]);
//       res.data.expenses.forEach(expense => {
//         showExpensesOnScreen(expense);
        
//       });

//     })
//     .catch((err) => {
     
//     });
// });

// function showExpensesOnScreen(obj) {
//   const parentElem = document.getElementById("list");
//   const childElem = document.createElement("li");
//   childElem.textContent =`${obj.amount} for ${obj.description} in category ${obj.field}  `;
    
//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete";
//   deleteButton.id ="delete";
//   deleteButton.onclick = () => {
//     //parentElem.removeChild(childElem);
//     axios
//       .delete(`http://localhost:3000/expense/delete/${obj.id}`)
//       .then(() => {
//         parentElem.removeChild(childElem);
//         console.log("Expense deleted successfully");
//       })
//       .catch((err) => {
//         console.log("There is an error deleting expense", err);
//       });
//   };

//   childElem.appendChild(deleteButton);
//   parentElem.appendChild(childElem);
//   document.getElementById("form").reset();
// }