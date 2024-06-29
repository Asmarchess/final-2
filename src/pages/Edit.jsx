import axios from "axios"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import { Link, useParams } from "react-router-dom"


export default function Edit() {
  const {id} = useParams();
   const [editdata, seteditdata] = useState({})
   useEffect(() => {
     fetch('http://localhost:3000/alveer/'+id)
    .then(res=>res.json())
    .then((editdata)=>{seteditdata(editdata); setpostget(editdata.img)})
   }, [])

    const [postget, setpostget] = useState(null)
    const PostgetElement = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setpostget(reader.result)
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({defaultValues : async ()=>axios.get('http://localhost:3000/alveer/'+id)})


    const onSubmit = (data) => {
        axios.patch('http://localhost:3000/alveer/'+id, { ...data, img: postget, })
    }
    return (
        <div className="add container mt-5">
            <h2>Edit Sehifesi</h2>
            <div className="add_esas">
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <label>Img:
                        <input type="file" name="img"  onInput={(e) => PostgetElement(e.target.files[0])}/>
                        {postget && <img src={postget} width='80px' height='80px' />}
                    </label>
                    <label>Name:
                        <input {...register("name")} defaultValue={editdata.name} />
                    </label>
                    <label>Money:
                        <input {...register("money", { required: true, valueAsNumbe:true  })} defaultValue={editdata.money} />
                    </label>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <div className="row">
                        <input type="submit" className="col-lg-6" />
                        <Link to='/admin' className="col-lg-6"><button className="btn btn-primary">Geri</button></Link>
                    </div>

                </form>
            </div>
        </div>


    )
}