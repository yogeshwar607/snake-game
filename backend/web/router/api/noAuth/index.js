
const test = function (req,res,next){
  res.json({
    success:true
  })
}

module.exports = (router) => {
    router.get('/test', test);
};