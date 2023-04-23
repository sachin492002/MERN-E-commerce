import React, {useEffect,  useState} from 'react';
import styled from 'styled-components';
import 'react-icons/fa'
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import Feed from './feed'


const Feeds = () => {


    const [data,setData]=useState([]);
    const [count,setcount]= useState(0);
    const handlefeeds = () => {
      setcount(count+1);
    };
    useEffect(()=>{
        axios.get('http://localhost:3001/feeds')
            .then(response => {
                console.log(response)
                setData(response.data)
            })
    },[count])
    
    return(
        <Wrapper>
            <div className='test1'><h1>What our User Says
            </h1></div>
            <div className="testimonial-box-container">
                { (
                data.map((msg) => (
                        <div className="testimonial-box">
                            <div className="box-top">
                                <div className="profile-1">
                                    <div className="profile-img">
                                        <PersonIcon className='icon'/>
                                    </div>
                                    <div className="name-user">
                                        <strong>{msg.id}</strong>
                                        <span>@{msg.mail}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="client-comment">
                                <p>{msg.msg}</p>
                            </div>           
                        </div>
                ))
            )}
            
        </div>
        <Feed handlefeeds={handlefeeds}/>
        </Wrapper>
    )
}

const Wrapper = styled.section`
background-color:var(--clr-grey-10);

padding:10px;
.test1 {
  display: flex;
  letter-spacing: 1px;
  //display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 50%;
  margin-top:30px;
  margin-bottom:30px;
  h1 {
    font-size: 2.2rem;
    font-weight: 500;
    background-color: var(--clr-primary-4);
    color: white;
    padding: 10px 20px;
    border-radius:10px;
  }
}

.testimonial-box-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border-radius:10px;
}
.testimonial-box {
  width: 500px;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.2);
  border-color: var(--clr-primary-2);
  background-color:white;
  padding: 20px;
  margin: 15px;
  cursor: pointer;
  border-radius:10px;
}
.profile-img {
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-right: 10px;
}
.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  color:black;
}
.profile-1 {
  display: flex;
  align-items: center;
}
.name-user {
  display: flex;
  flex-direction: column;
}
.name-user strong {
  color: var(--clr-primary-2);
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}
.name-user span {
  color: var(--clr-primary-6);
  font-size: 0.8rem;
  //font-style:bold;
}
.box-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.client-comment p {
  font-size: 0.9rem;
  color: var(--clr-primary-1);
}
.testimonial-box:hover {
  transform: translateY(-10px);
  transition: all ease 0.3s;
}
`;

export default Feeds;