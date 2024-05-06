

var data = new FormData();
data.append('username', 'tester');
data.append('password', '12345');

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://jelan.pythonanywhere.com/api/user/login',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
