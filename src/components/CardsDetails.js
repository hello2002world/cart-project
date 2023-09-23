import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE, ADD, REMOVE } from '../redux/actions/action'

const CardsDetails = () => {
  const [data, setData] = useState([])
  // console.log(data);
  const { id } = useParams();
  // console.log(id);

  const history = useNavigate();

  const getdata = useSelector((state) => state.cartreducer.carts)
  // console.log(getdata);

  const dispatch = useDispatch();

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id === id
    });
    setData(comparedata);
  }

  // add data
  const send = (e) => {
    dispatch(ADD(e))

  }

  const dlt = (id) => {
    dispatch(DELETE(id))
    history("/");
  };

  // remove one
  const remove = (item) => {
    dispatch(REMOVE(item))
  }



  useEffect(() => {
    compare();
  }, [id])
  return (
    <>
      <div className='container mt-2 bg-light'>
        <h2 className='text-center'>Items Details Page</h2>

        <section className='container mt-3'>
          <div className='itemsdetails d-flex'>
            {
              data.map((ele) => {
                return (
                  <>
                    <div className='items_img ml-3'>
                      <img src={ele.imgdata} alt='' />
                    </div>
                    <div className='details'>
                      <Table>
                        <tr>
                          <td>
                            <p> <strong>Restaurant</strong>: {ele.rname}</p>
                            <p> <strong>Price</strong>: ₹{ele.price}</p>
                            <p> <strong>Dishes</strong>: {ele.address}</p>
                            <p> <strong>Total</strong>: ₹ {ele.price * ele.qnty}</p>
                            <div className='mt-5 d-flex justify-content-between align-items-center bg-success' style={{ width: 100, cursor: "pointer", color: "white" }}>
                              <span style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}>-</span>
                              <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                              <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>

                            </div>
                          </td>
                          <td>
                            <p> <strong>Rating:</strong><span style={{ background: "green", color: "white", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating}⭐</span></p>
                            <p> <strong>Order Review:</strong><span>1175 + <br />{ele.somedata}</span></p>
                            <p> <strong>Remove:</strong><span><i className='fas fa-trash' onClick={() => dlt(ele.id)} style={{ color: "red", fontSize: 20, cursor: "Pointer" }}></i></span></p>
                          </td>
                        </tr>
                      </Table>
                    </div>
                  </>
                )
              })
            }

          </div>
        </section>
      </div>
    </>
  )
}

export default CardsDetails;
