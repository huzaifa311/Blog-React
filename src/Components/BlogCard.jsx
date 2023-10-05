import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = (
    { title, description, author, authorImage, date, linkToProfile, showDeleteButton, onClickdlt }
) => {
    return (
        <div className="bg-white shadow-2xl border-[1px] border-gray-300 rounded-lg overflow-hidden w-[97%] sm:w-[600px] h-full min-h-[370px]">

            <div className="px-6 py-4 flex justify-between bg-slate-300 ">

                <div className="flex items-center">
                    <img
                        src={authorImage}
                        alt={author}
                        className="w-14 h-14 rounded-full mr-2 object-cover object-center"
                    />
                    <div>
                        <Link to={linkToProfile} className="text-2xl font-medium text-gray-900">{author}</Link>
                        <p className="text-sm text-gray-600">{date}</p>
                    </div>
                </div>
                {showDeleteButton && (
                    <div className='block'>
                        <i onClick={onClickdlt} className="fas fa-trash top-0 cursor-pointer text-red-600 text-lg"></i>
                    </div>
                )}
            </div>
            <div className="px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default BlogCard;
