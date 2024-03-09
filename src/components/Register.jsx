
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import "./Register.css";
import axios from 'axios';


 const errorMessages={
    isim:"En az 3 karakter giriniz",
    eposta:"Geçerli bir email adresi giriniz",
    password:'En az 8 karakter olmalı, büyük küçük harf,sembol ve sayı içermeli'
};



export default function Register() {
  
  const [formData, setFormData] = useState(
    {isim:'',
    eposta: '',
    yas: '',
    password:'',
    workingstatus:'çalişmiyor',
    hakkimda: '',
  });

  const [errors,setErrors]=useState({isim:false,
  eposta:false,
  password:false,
  });

const[isValid,setIsValid]=useState(false);

const[id,setId]=useState("");

const validateEmail = (eposta) => {
    return String(eposta)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
 
  function checkPassword(password)
{
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(password);
}  

useEffect(()=>{
    if(formData.isim.trim().length>=3 && validateEmail(formData.eposta)&&checkPassword(formData.password)&&(formData.hakkimda.length)>=3){
        setIsValid(true);
    }
    else{
        setIsValid(false);
    }
},[formData]);


function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if(name=="isim"){
        if(value.trim().length>=3){
            setErrors({...errors,[name]:false})
        }
        else{
            setErrors({...errors,[name]:true})
        }
    }
    if(name=="eposta"){
        if(validateEmail(value)){
            setErrors({...errors,[name]:false})
        }
        else{
            setErrors({...errors,[name]:true})
        }
    }
    if(name=="password"){
        if(checkPassword(value)){
            setErrors({...errors,[name]:false})
        }
        else{
            setErrors({...errors,[name]:true})
        }
    }

}


  const handleSubmit = (event) => {
    event.preventDefault();
   
  
  if(!isValid) return;
  axios.post(" https://reqres.in/api/users",formData)
  .then((response)=>{
    setId(response.data.id)
    setFormData({ isim: '',eposta: '', yas: '',password:'',workingstatus:'', hakkimda: '' });
  })
  .catch((error)=>console.warn(error));
  };


  const handleClear = (event) => {
    setFormData({ isim:'', eposta: '', yas: '',password:'',workingstatus:'',hakkimda: '' });
  };
  return (
    <Card>
         <CardHeader className='header'>Kayıt Olun</CardHeader>
         <CardBody>
      <Form onSubmit={handleSubmit}>
       <FormGroup>
        <Label for="isim" className="label">Adı-Soyadı:</Label> 
          <Input
            name="isim"
            id="isim"
            type='text'
            onChange={handleChange}
            value={formData.isim}
            invalid={errors.isim}
            data-cy="ad-input"
          />
          {errors.isim &&<FormFeedback>{errors.isim}</FormFeedback>}
          </FormGroup>
       <FormGroup>
        <Label for="eposta" className="label">Email:</Label>
          <Input
            name="eposta"
            id="eposta"
            type="email"
            onChange={handleChange}
            value={formData.eposta}
            invalid={errors.eposta}
            data-cy="eposta-input"
          />
          {errors.eposta &&<FormFeedback>{errors.eposta}</FormFeedback>}
          </FormGroup>
        <FormGroup>
        <Label for="yas"className="label">Yaş: </Label>
        <Input
          name="yas"
          id="yas"
          type="number"
          onChange={handleChange}
          value={formData.yas}
        />
        </FormGroup>

        <FormGroup>
         <Label for="password" className="label">Şifreniz:</Label>
          <Input
          type="password"
          name="password"
          id="sifre"
          placeholder="Şifrenizi giriniz..."
          onChange={handleChange}
          value={formData.password}
          invalid={errors.password}
          data-cy="password-input"
        />
        {errors.password &&<FormFeedback>{errors.password}</FormFeedback>}

        </FormGroup>
        <p className='label'>Çalışma Durumu:</p>
        <Label for="workinstatus">Çalışmıyor</Label>
        <Input
          type="radio"
          name="workingstatus"
          id="çalişmiyor"
          onChange={handleChange}
          value="çalişmiyor"
          checked={formData.workingstatus == 'çalişmiyor'}
        />{' '}
        <Label for="workingstatus">Çalışıyor</Label>
        <Input
          type="radio"
          name="workingstatus"
          id="çalişiyor"
          onChange={handleChange}
          value="çalişiyor"
          checked={formData.workingstatus == 'çalişiyor'}
        />{' '}
        <Label for="workingatus">Öğrenci</Label>
        <Input
          type="radio"
          name="workingstatus"
          id="öğrenci"
          onChange={handleChange}
          value="öğrenci"
          checked={formData.workingstatus == 'öğrenci'}
        />{' '}
        <FormGroup>
        <Label for="hakkimda" className="label">Bilgileriniz:</Label>
         <textarea
          placeholder="Hakkınızda birkaç cümle yazınız"
          name="hakkimda"
          onChange={handleChange}
          invalid={errors.hakkimda}
          value={formData.hakkimda}
          data-cy="hakkimda-input"
        ></textarea>
        </FormGroup>
        <Button className="buton"type="button" onClick={handleClear}>
          Temizle
        </Button>
        <Button className="buton" type="submit" disabled={!isValid} data-cy="submit-input">Kayıt Ol</Button>
      </Form>
    </CardBody>
    <CardFooter>
        ID:{id}
    </CardFooter>
    </Card>
  );
}