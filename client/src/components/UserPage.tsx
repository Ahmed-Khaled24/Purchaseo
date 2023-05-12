import React from 'react'
import "../css/userpage.css"

function UserPage() {
  const [userFormData, setUserFormData] = React.useState({
    id: 1,
    name: "Abdelrahman Sherif Fayez Aly Saleh",
    address: "myAddress",
    country: "Egypt",
    email: "abdo.sherif@hotmail.com",
    phone: "01023448976",
    birthDate: "11/1/2001",
    isEditable: false
  })

  function handleChange(event) {
    const { name, value } = event.target
    console.log(userFormData)
    setUserFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }


  function showEditable() {
    setUserFormData(prevData => {
      return {
        ...prevData,
        isEditable: true
      }
    })
  }

  function saveChanges(event) {
    event.preventDefault()
    setUserFormData(prevData => {
      return {
        ...prevData,
        isEditable: false
      }
    })
    console.log(userFormData)
  }


  return (
    <div>
      <div className="usr-div">
        <h2>My Profile Account</h2>
        <hr></hr>
        <div className="label-div">
          <label>Name :</label>
          {userFormData.isEditable ?
            <input
              type="text"
              value={userFormData.name}
              placeholder="Name..."
              name="name"
              onChange={handleChange}
            /> : <p>{userFormData.name}</p>
          }
        </div>

        <div className="label-div">
          <label>Email :</label>
          {userFormData.isEditable ?
            <input
              type="email"
              value={userFormData.email}
              placeholder="Email ..."
              name="email"
              onChange={handleChange}
            /> : <p>{userFormData.email}</p>
          }

        </div>

        <div className="label-div">
          <label>Phone :</label>
          {userFormData.isEditable ?
            <input
              type="tel"
              maxLength={11}
              value={userFormData.phone}
              placeholder="Enter Phone Number..."
              name="phone"
              onChange={handleChange}
            /> : <p>{userFormData.phone}</p>
          }
        </div>

        <div className="label-div">
          <label>Country :</label>
          {userFormData.isEditable ?
            <input
              type="text"
              value={userFormData.country}
              placeholder="Enter Country ..."
              name="country"
              onChange={handleChange}
            /> : <p>{userFormData.country}</p>
          }
        </div>

        <div className="label-div">
          <label>Address :</label>
          {userFormData.isEditable ?
            <input
              type="text"
              value={userFormData.address}
              placeholder="Enter Address ..."
              name="address"
              onChange={handleChange}
            /> : <p>{userFormData.address}</p>
          }
        </div>

        <div className="label-div">
          <label>BirthDate :</label>
          {userFormData.isEditable ?
            <input
              type="text"
              value={userFormData.birthDate}
              placeholder="Enter BirthDate(dd:mm:yyyy) ..."
              name="birthDate"
              onChange={handleChange}
            /> : <p>{userFormData.birthDate}</p>
          }
        </div>

      </div>

      <div className="buttons">
        <button className="save-btn" onClick={saveChanges}>SAVE</button>
        <button className="edt-btn" onClick={showEditable}>EDIT</button>
      </div>
    </div>
  )
}

export default UserPage