let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
let Schema = mongoose.Schema

// mongoose.connect('mongodb://localhost/nodeproject',{ useNewUrlParser: true })


let userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/min.jpg'
  },
  bio: {
    type: String,
    default: ''
  },
  sex: {
    type: Number,
    //0表示保密，1为男，-1为女
    enum: [-1,0,1],
    default: 0
  },
  birthday: {
    type: Date,
  },
  status: {
    type: Number,
    //0 表示没有权限限制
    //1 不可登录
    //2 不可评论
    enum: [0,1,2],
    default: 0
  }
})


module.exports = mongoose.model('User',userSchema)
