import {useState} from "react";

const EditRoom = () => {
    const[room, setRoom] = useState(null);

    const fetchRoom = async () => {
        try {
            const response = await getRoom
        }catch (error){
            console.log(error.message);
        }
    }

    return (

    );
};

export default EditRoom;
