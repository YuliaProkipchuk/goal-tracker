import { Form, useRouteLoaderData, useSubmit } from "react-router-dom";
import PieTypeCharts from "../components/Diagrams/PieTypesChart";
import { useRef, useState } from "react";

export default function ProfilePage() {
  const { user } = useRouteLoaderData("user");
  const imageRef = useRef()
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    image:user.image
  });
  const [image, setImage] = useState({
    image:'',
    metadata:''
  });
  function handleOnChange(e) {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function imagePick(e){
    const file = e.target.files[0];
    console.log(file);
    
    const fileReader = new FileReader();
    fileReader.onload=()=>{
         setImage({
        // ...prev,
        image:fileReader.result,
        metadata:file
    })
    }
    fileReader.readAsDataURL(file)
  }
  function openFilePicker(){
    imageRef.current.click();
  }
  function onEdit() {
    // console.log(isEditing);

    if (isEditing) {
      // console.log(userData);
      const formData = new FormData();
      // formData.append('image', userData.image);
      const token = localStorage.getItem('token')
      formData.append('imageFile', image.metadata);
      formData.append('data', JSON.stringify(userData));
      // formData.append('username', userData.username);
      // formData.append('email', userData.email);
      const response = fetch(`http://localhost:8080/profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then(res=>res.json())
      .then(data=>{
        setUserData({
          username:data.username,
          email:data.email,
          image:data.image
        })
        console.log(data)});

    }
    setIsEditing((prev) => !prev);
  }
  return (
    <main className="profile-main">
      {/* <div className="profile-info"> */}
        {" "}
        <Form method="patch" className="profile-info">
          <div className="pr-picture-wrapper">
            <img
              className="profile-image"
            //   src="https://images.unsplash.com/photo-1721765500525-886babc7b6ed?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            src={isEditing && image.image?image.image:`http://localhost:8080/images/${userData.image}`}
            alt="profile picture"
            />
            {isEditing && (
              <div className="edit-photo" onClick={openFilePicker}>
                <input type="file" id="image" name="image" accept="image/png, image/jpeg"  onChange={imagePick} ref={imageRef}/>
                <i className="bi bi-camera"></i>
              </div>
            )}
          </div>
          <div className="user-info">
            {!isEditing && (
              <>
                <h1>{userData.username}</h1>
                <h4>{userData.email}</h4>
              </>
            )}

            {isEditing && (
              <>
                <input
                  type="text"
                  value={userData.username}
                  className="edit-input"
                  name="username"
                  onChange={handleOnChange}
                />
                <input
                  type="email"
                  value={userData.email}
                  className="edit-input"
                  name="email"
                  onChange={handleOnChange}
                />
              </>
            )}
            <button type="button" className="edit-profile" onClick={onEdit}>
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>
        </Form>
      {/* </div> */}

      {/* <p>Change password</p> */}
      <hr />
      <div className="user-statisics">
        <div className="user-statisics-pie">
          <h3>Total goals: {user.goals.length}</h3>
          <PieTypeCharts goals={user.goals} />
        </div>
      </div>
    </main>
  );
}
export async function action({request, params}){
  // const formData =await request.formData();
  // const token = localStorage.getItem('token');
  // const obj={
  //   username:formData.get('username'),
  //   email:formData.get('email'),
  //   // image:formData.get('image'),
  //   imageName:formData.get('imageFile')
  // };
  // const response = await fetch(`http://localhost:8080/profile`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: formData,
  // });
  return null;
}