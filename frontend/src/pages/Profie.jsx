import PieTypeCharts from "../components/Diagrams/PieTypesChart";
import { useRef, useState } from "react";
import {
  useEditUserProfileMutation,
  useGetUserProfileQuery,
} from "../features/profile/profileApiSlice";

export default function ProfilePage() {
  const { data: user } = useGetUserProfileQuery();
  const [editUserProfile] = useEditUserProfileMutation();

  const imageRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    image: user.image,
  });
  const [image, setImage] = useState({
    image: "",
    metadata: "",
  });

  function handleOnChange(e) {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function imagePick(e) {
    const file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage({
        image: fileReader.result,
        metadata: file,
      });
    };
    fileReader.readAsDataURL(file);
  }

  function openFilePicker() {
    imageRef.current.click();
  }

  async function onEdit() {
    if (isEditing) {
      const data = {
        imageFile: image.metadata,
        data: JSON.stringify(userData),
      };
      try {
        const res = await editUserProfile(data).unwrap();
        const { user } = res;
        setUserData({
          username: user.username,
          email: user.email,
          image: user.image,
        });
      } catch (error) {
        console.log(error);
      }
    }
    setIsEditing((prev) => !prev);
  }

  return (
    <main className="profile-main">
      {user && (
        <>
          <form method="patch" className="profile-info">
            <div className="pr-picture-wrapper">
              <img
                className="profile-image"
                src={
                  isEditing && image.image
                    ? image.image
                    : `http://localhost:8080/images/${userData.image}`
                }
                alt="profile picture"
              />
              {isEditing && (
                <div className="edit-photo" onClick={openFilePicker}>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={imagePick}
                    ref={imageRef}
                  />
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
          </form>

          <hr />
          <div className="user-statisics">
            <div className="user-statisics-pie">
              <h3>Total goals: {user.goals.length}</h3>
              <PieTypeCharts goals={user.goals} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
