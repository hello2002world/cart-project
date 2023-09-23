import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Card'
import Cardsdata from './CardsData'
import './style.css'
import { useDispatch } from 'react-redux'
import { ADD } from '../redux/actions/action'

function Cards() {
  const [data, setData] = useState(Cardsdata);
  // console.log(data);

  const dispatch =useDispatch();


  const send =(e)=>{
    dispatch(ADD(e))
  
  }
  return (
    <div className='container mt-3'>
      <h2 className='text-center'>Add to Cart Projects</h2>
      <div className='row d-flex justify-content-center align-items-center'>
        {
          data.map((element, id) => {
            return (
              <>
                <Card style={{ width: "26rem", border: "none" }} className='mx-2 mt-4 card_style'>
                  <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem" }} className='mt-3' />
                  <Card.Body>
                    <Card.Title>{element.rname}</Card.Title>
                    <Card.Text>
                      Price:₹{element.price}
                    </Card.Text>
                    <div className='button_div d-flex justify-content-center'>
                      <Button onClick={()=>send(element)}
                      className=' bg-primary text-center' style={{width:"100%", height:"35px"}}>Add to Cart</Button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cards;