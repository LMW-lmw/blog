let express = require('express')
let router = express.Router()
let md5 = require('blueimp-md5')
let User = require('./models/user')

router.get('/', function (req,res) {
  console.log(req.session.user);
  console.log('访问首页');
  res.render('index.html',{
    user: req.session.user
  })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res) {

})

router.get('/register', function (req, res) {
  res.render('register.html')
})

// router.post('/register', function (req, res) {
//   console.log(req.body);
//   let body = req.body
//   User.findOne({
//     $or: [
//       {email: body.email},
//       {nickname: body.nickname}
//     ]
//   },function (err,data) {
//     if(err){
//       return res.status(500).json({
//         err_code: 500,
//         message: 'Server is Error'
//       })
//     }
//     if(data){
//       return res.status(200).json({
//           err_code: 1,
//           message: 'email or nickname already exists.'
//         })
//     }
//     body.passowrd = md5(md5(body.passowrd))
//     new User(body).save(function (err,user) {
//       if(err){
//         return res.status(500).json({
//           err_code: 1,
//           message: err
//         })
//       }
//       req.session.user = user
//       res.status(200).json({
//         err_code: 0,
//         message: 'ok'
//       })
//     })
//
//   })
// })

router.post('/register',async function (req,res) {
  let body = req.body
  try {
    if (await User.findOne({email: body.email})){
      return res.status(200).json({
        err_code: 1,
        message: '邮箱已存在'
      })
    }
    if (await User.findOne({nickname: body.nickname})){
      return res.status(200).json({
        err_code: 2,
        message: '用户名已存在'
      })
    }
    body.passowrd = md5(md5(body.passowrd))
    // await new User(body).save()
    let user = await new User(body).save()
    req.session.user = user
    res.status(200).json({
      err_code: 0,
      message: 'ok'
    })
  }catch (e) {
    res.status(500).json({
      err_code: 500,
      message: e.message
    })
  }
})

module.exports = router