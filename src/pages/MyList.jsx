import { useState } from "react";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyList = () => {



    const [items, setItems] = useState([])
    const { userInfo } = useContext(AuthContext);
    const userEmail = userInfo?.email;
    useEffect(() => {
        fetch(`https://server-10-theta.vercel.app/tourist-spots/${userEmail}`)
            .then(res => res.json())
            .then(data => {
                setItems(data)
            })
    }, [userEmail])


    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://server-10-theta.vercel.app/tourist-spots/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json)
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your spot has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div className="container my-10 mx-auto">
            <Helmet><title>Dream Wander | My List</title></Helmet>
            <h2 className="text-3xl mb-3 text-center font-bold">My List</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-lg">
                        <tr>
                            <th>Spot Name</th>
                            <th>Location</th>
                            <th>Travel Time</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item => (
                                <tr key={item._id}>
                                    <td>{item.tourists_spot_name}</td>
                                    <td>{item.location}</td>
                                    <td>{item.travel_time}</td>
                                    <td><Link to={`/update-spot/${item._id}`} className="btn bg-primary btn-sm text-white hover:text-primary">Edit</Link></td>
                                    <td><button onClick={() => handleDelete(item._id)} className="btn bg-secondary btn-sm text-white hover:text-red-500">Delete</button></td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyList;