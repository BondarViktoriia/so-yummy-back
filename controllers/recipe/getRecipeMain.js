const {Recipe} = require('../../models')

const getRecipeMain = async (req, res) => {
  
    const result = []
  const chicken = await Recipe.find({
   id:1,
        category: ["Chicken"] ,        
    }, '-createdAt -updatedAt').limit(4)
    result.push(chicken)

  const breakfast = await Recipe.find({
      id:2,
      category: ["Breakfast"],
    }, '-createdAt -updatedAt').limit(4)
    result.push(breakfast)

  const desserts = await Recipe.find({
      id:3,
      category: ["Dessert"],
    }, '-createdAt -updatedAt').limit(4)
     result.push(desserts)
    
  const miscellaneous = await Recipe.find({
      id:4,
      category: ["Miscellaneous"],
    }, '-createdAt -updatedAt').limit(4)
    
    result.push(miscellaneous)

   
     res.status(200).json(result) 
} 


module.exports = {
    getRecipeMain

}