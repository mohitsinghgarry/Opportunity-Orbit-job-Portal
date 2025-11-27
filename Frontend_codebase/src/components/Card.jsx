import React from 'react'
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';

const Card = ({ data }) => {
  const { _id, companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, employmentType, postingDate, description } = data;

  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 hover:shadow-lg transition-all">
      <Link to={`/job/${_id}`} className='flex gap-6 flex-col sm:flex-row items-start'>
        <img
          src={companyLogo}
          alt={companyName}
          className="w-24 h-24 object-contain rounded-md bg-gray-50 border border-gray-100 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-primary mb-1 font-semibold text-base">{companyName}</h4>
          <h3 className="text-lg font-bold mb-2 text-gray-900">{jobTitle}</h3>
          <div className="text-primary/70 text-base flex flex-wrap gap-4 mb-2">
            <span className="flex items-center gap-2"><FiMapPin /> {jobLocation}</span>
            <span className="flex items-center gap-2"><FiClock /> {employmentType}</span>
            <span className="flex items-center gap-2"><FiDollarSign /> {minPrice}-{maxPrice}</span>
            <span className="flex items-center gap-2"><FiCalendar /> {postingDate}</span>
          </div>
          <p className="text-base text-gray-600 truncate">{description}</p>
        </div>
      </Link>
    </section>
  )
}

export default Card
