import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav'
import Menu from '@mui/material/Menu';
import { Table } from 'react-bootstrap'
import { DELETE } from '../redux/actions/action';

// import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    const [price, setPrice] = useState(0);
    console.log(price);

    const getdata = useSelector((state) => state.cartreducer.carts)
    console.log(getdata);

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id)=>{
        dispatch(DELETE(id))
    }

    const total =()=>{
        let price =0;
        getdata.map((ele,k)=>{
            price = ele.price + price
        });
        setPrice(price)
    };
    useEffect(()=>{
       total();
    },[total])
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
                    </Nav>
                    <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <i className='fa-solid fa-cart-shopping text-light' style={{ fontSize: 25, cursor: "pointer" }}></i>
                    </Badge>

                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        getdata.length ?
                            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map((e)=>{
                                                return(
                                                    <>
                                                    <tr>
                                                        <td>
                                                           <NavLink to={`/cart/${e.id}`}onClick={handleClose}> <img src={e.imgdata}style={{width:"5rem",height:"5rem"}} alt=""/>
                                                           </NavLink>
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price: ₹{e.price}</p>
                                                            <p>Quantity: ₹{e.qnty}</p>
                                                            <p style={{color:"red",cursor:"pointer",fontSize:20}} onClick={()=>dlt(e.id)}>
                                                                <i className='fas fa-trash smalltrash'></i></p>
                                                        </td>
                                                        <td className='mt-5'style={{color:"red",cursor:"pointer",fontSize:20}} onClick={()=>dlt(e.id)}>
                                                        <i className='fas fa-trash largetrash'></i> 
                                                        </td>
                                                    </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'>Total: ₹{price}</p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className='card_details d-flex justify-content-center align-item-center' style={{ width: "15rem", padding: 10, position: "relative" }}>
                                <i className='fas fa-close smallclose'
                                    onClick={handleClose}
                                    style={{ position: "absolute", top: 2, right: 10, cursor: "pointer", fontSize: "20px" }}></i>
                                <p style={{ fontSize: 20, marginTop: "8px" }}> Your Cart is Empty</p>
                                <img src="./cart.gif" alt=''></img>
                            </div>
                    }

                </Menu>

            </Navbar>
        </>
    )
}
export default Header
