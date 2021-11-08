import React from 'react';

const SubscriberItem = ({ item, index, deleteSubscriber }) => {
    return (
        <tr>
            <td>{index+1}</td>
            <td>{item.email}</td>
            <td>{item.firstname + " " + item.lastname}</td>
            <td>
                <button
                    onClick={() => deleteSubscriber(item.subscriberId)}
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="fa fa-trash-o" />
                </button>
            </td>
        </tr>
    );
}

export default SubscriberItem;