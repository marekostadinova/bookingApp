"use client"
import {useState} from "react";

export default function Booking(){
//vo form data gi cuvame site vneseni podatoci
    const [formData, setFormData]=useState({
    name:"",
    email:"",
    service:"",
    date:"",
    time:"",
});
//gi cuvame greskite
const [errors, setErrors]=useState({});

//koga ke smeneme bilo koe pole se menuva samo soodvetnata vrednost vo formData
function handleChange(event){
    const{name,value} = event.target;

    setFormData({
        ...formData,
        [name]:value,
    });
}
async function handleSubmit(event){
    event.preventDefault();
const newErrors = {};
//ako poleto e prazno ke dade greska deka treba das e vnesat podatoci
if(!formData.name){
    newErrors.name="Внеси име и презиме";
}
if(!formData.email){
    newErrors.email="Внеси е-пошта";
}
if(!formData.service){
    newErrors.service="Избери услуга";
}
if(!formData.date){
    newErrors.date="Избери датум";
}
if(!formData.time){
    newErrors.time="Избери време";
}
setErrors(newErrors);

//ako ima barem edna greska funckijata zapira i formata ne prodolzuva ponatamu
if(Object.keys(newErrors).length>0)
{
    return;
}
try{
    //API ruta sto se pravi
    const response = await fetch("/api/bookings",{
        method: "POST", //isprakjame novi podatoci
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData), //go pretvora formdata objekt vo JSON i go isprakja do backend
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    console.log(data);

    alert("Терминот е успешно закажан");

    setFormData({
        name:"",
        email:"",
        service:"",
        date:"",
        time:"",
    });
    setErrors({});
}
catch(error){
    console.log(error);

    alert(error.message);
}

console.log("Успешно внесени податоци")
    console.log(formData);
    setFormData({
        name:"",
        email:"",
        service:"",
        date:"",
        time:"",
    });
    setErrors({});
}
return(
    <section>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Име и презиме</label>
                <input 
                type = "text"
                name = "name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Внеси име и презиме"/>
                {errors.name &&<p>{errors.name}</p>}
            </div>
            <div>
                <label>Е-пошта</label>
                <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com" />
                  {errors.email &&<p>{errors.email}</p>}
            </div>
            <div>
                <label>Услуга</label>
                <select 
                name="service"
                value={formData.service}
                onChange={handleChange}>
                    <option value="">Избери услуга</option>
                    <option value="Шишање">Шишање</option>
                    <option value="Фенирање">Фенирање</option>
                     <option value="Фарбање">Фарбање</option>
                    <option value="Прамени">Прамени</option>
                    <option value="Кератински третман">Кератински третман</option>
                    <option value="Машко шишање">Машко шишање</option>
                    <option value="Средување брада">Средување брада</option>
                </select>
                  {errors.service &&<p>{errors.service}</p>}
            </div>
            <div>
            <label>Датум</label>
            <input 
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}/>
              {errors.date &&<p>{errors.date}</p>}
            </div>
            <div>
                <label>Термин</label>
                <input 
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}/>
                  {errors.time &&<p>{errors.time}</p>}
            </div>
            <button type="submit">Закажи термин</button>
        </form>
    </section>
);


}