import { Link } from '@inertiajs/react';
import React from 'react';

export const Pagination = ({ links = [] }) => {
  return (
    <nav className="text-center mt-4">
      {links.length > 0 ? (
        links.map((link, index) => (
          link.url ? (
            <Link
              key={index}
              href={link.url}
              className={`${link.active ? 'text-blue-500 font-bold' : 'text-gray-500'} mx-2`}
              dangerouslySetInnerHTML={{ __html: link.label }} // Render the HTML label correctly
            />
          ) : (
            // Disable button if URL is null (like for 'Previous' and 'Next' when not available)
            <span
              key={index}
              className="text-gray-400 mx-2 cursor-not-allowed"
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          )
        ))
      ) : (
        <p>No pagination available</p> // Show this message if no pagination links exist
      )}
    </nav>
  );
};
