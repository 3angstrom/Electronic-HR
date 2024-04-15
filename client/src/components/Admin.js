import { string } from "hardhat/internal/core/params/argumentTypes"
import { useState } from "react"

const Admin = (account) => {

  const [formData, setFormData] = useState({
    id : null,
    info : string
  })


  const handleSubmit = () => {

  }

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  }

  return (
    <div>
      <form onSubmit={handleChange}>
        <label>Doctor Id: </label>
        <input type="text" onChange={handleChange} name="id" value={formData.id} /> <br />
        <label>Doctor Info:</label>
        <input type="text" onChange={handleChange} name="info" value={formData.info} />
      </form>
    </div>
  )
}


export default Admin