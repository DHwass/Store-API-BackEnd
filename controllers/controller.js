const wrapper=require('../middleware/wrapper')
const Product=require('../models/product')


const getAllProducts=async (req,res)=>{
    
    const {company,featured,name,sort,fields,page,numericFilters}=req.query
    const query={}
   
   if (company){
        query.company=company
   }

   if(featured){
    if (featured==="true"){
        query.featured=true
    }
    else {
        query.featured=false
    }
   }
   if(name)
   {
    query.name={$regex:name,$options:'i'}
   }
   let result=Product.find(query)
   if (sort){
    result=result.sort(convertCommasToSpaces(String(sort)))
   }
   else{
    result.sort('-createdAt')
}
   if (fields){
    result=result.select(convertCommasToSpaces(String(fields)))
   }

   let limit=req.query.limit||10
   const skip=(Number(page)-1)*Number(limit)
   if(page){
    result=result.skip(skip)
    console.log((Number(page)-1)*Number(limit))
  }
    result=result.limit(Number(limit))
   

    if (numericFilters) {
        const operatorMap = {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            query[field] = { [operator]: Number(value) };
          }
        });
      }
 
  
   
   result=await result
   
   res.status(200).json(result)
   console.log(req.query)
   
    
}
function convertCommasToSpaces(str) {
    return str.replace(/,/g, ' ');
  }

module.exports={getAllProducts}