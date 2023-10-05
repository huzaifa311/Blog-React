import React, { useState } from 'react';

const ProfileCard = ({ name, email, imageUrl }) => {
  const [image, setImage] = useState(imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP2dYoEglF0TcILTX__siuF-QvrAxUYbrbayB0Q4n0&s");

  return (
    <div className="flex flex-col mt-[72px] border-[1px] border-gray-300 h-full w-[250px] bg-white shadow-2xl rounded-lg pt-3">

      <div className=" flex justify-center ">
        <img
          src={image}
          alt="Profile"
          className="w-[100px] h-[100px] rounded-full"
        />


      </div>
      <div className="p-4 flex flex-col align-middle items-center justify-center">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
