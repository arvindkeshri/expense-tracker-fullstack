const User = require("../models/user-model");
const Expense = require("../models/expense-model");
const sequelize = require("../util/sequelize");

const getUserLeaderboard = async (req, res) => {
  try {
    const leaderboardofusers = await User.findAll({
      order: [["total", "DESC"]],
    });

    res.status(200).json(leaderboardofusers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getUserLeaderboard,
};






























//BRUTE FORCE WAY >>>
// const getUserLeaderboard = async(req, res)=>{
//     try{
//         //we have to send aggregate expenses of each user to showLeaderboard route
//         const users = await User.findAll();
//         const expenses = await Expense.findAll();
//         const userAggregatedExpenses = {};

//         expenses.forEach(expense=>{
//             if(userAggregatedExpenses[expense.userId]){
//                 userAggregatedExpenses[expense.userId] += expense.amount;
//             }else{
//                 userAggregatedExpenses[expense.userId] = expense.amount;
//             }
//         })
//         console.log("userAggregatedExpenses>>>>>>>>",userAggregatedExpenses);
//         const  userLeaderboardDetails = [];
//         users.forEach((user)=>{
//             userLeaderboardDetails.push({name:user.name, total:userAggregatedExpenses[user.id]})
//         })

//         //sort users based on their expenditure
//         userLeaderboardDetails.sort((a,b)=>{
//             return b.total - a.total;
//         })
//         console.log("userLeaderboardDetails>>>>>>>>>", userLeaderboardDetails);
//         res.status(200).json( userLeaderboardDetails);

//     }catch(err){
//         console.log(err)
//         res.status(500).json(err)
//     }
// }

//Optimization 1 -  using JOINS & group-sequelize function
// const getUserLeaderboard = async (req, res)=>{
//     try{
//         const leaderboardofusers = await User.findAll({
//             attributes: ['id',
//             'name',
//             [sequelize.fn('sum', sequelize.col('expenses.amount')),'total']
//             ],

//             include: [
//                 {
//                     model: Expense,
//                     attributes: []
//                 }
//             ],

//             group:['id'],

//             order: [['total', 'DESC']]

//         })
//         res.status(200).json(leaderboardofusers);

//     }catch(err){
//         console.log(err)
//         res.status(500).json(err)
// }
// }
