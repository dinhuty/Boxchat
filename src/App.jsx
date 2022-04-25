import axios from 'axios'

import usersApi from './api/users'
import { uuid } from 'uuidv4';
import { useState, useEffect } from 'react';
function App() {
  // Khởi tạo users
  const [users , setUsers] = useState([])
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
// ______________________________________
// READ
  // Sử dụng useEffect để lấy dữ liệu api
  useEffect(() => {
   usersApi.get("/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => console.log(error))
  }, []);
  console.log(users)
// ______________________________________
// CREATE
  // Thêm dữ liệu vào Rest API
  function addUser(e) {
    e.preventDefault();
    if (username === "" || email === "") {
      alert("Không để trống");
      return;
    }
    // tạo ra một ofbject
    const response = {
      id: uuid,
      name : username,
      email
    }
    // Set mảng User thêm một response
    setUsers([...users,response])
    // Gửi dữ liệu đi
    usersApi.post("/users",response)
    // Trả lại giá trị ban đầu cho
    setUsername('')
    setEmail('')

  }

// 
  return (
    <div className="App" style={{color : "red"}}>
      <h2>Bình luận trước đó</h2>
      <br></br>
     {users.map((user) => (
       <div key={user.id}>
         <li>{user.name}</li>
         <li>{user.email}</li>
         <br></br>
       </div>
     ))}

    <h2>Bình luận</h2>
        <form onSubmit={addUser}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </div>
          <div className="field">
            <label>Nội dung bình luận</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <button>Add</button>
        </form>
    
    </div>
  );
}

export default App;



  // get data from api
  // const reUser = async () =>{
  //   const res =await api.get("/users")
  //   return res.data;
  // }
  // console.log(reUser)
  // useEffect(() => {
  //   const getAlluser = async () => {
  //     const allUser = await reUser();
  //     if(allUser) setUsers(allUser)
  //   }
  //   getAlluser();
  // }, []); 