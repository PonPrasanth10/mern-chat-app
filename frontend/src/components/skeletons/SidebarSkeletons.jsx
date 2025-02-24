import React from "react";
import { Users } from "lucide-react"; // Ensure you have Lucide Icons installed
import "../../styles/SidebarSkeleton.css"; // Import the CSS file

const skeletonContacts = new Array(8).fill(null); // Creates an array of 5 skeleton items

const SidebarSkeleton = () => {
  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="header-content">
          <Users className="icon" />
          <span className="header-text">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="skeleton-contacts">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="skeleton-contact">
            {/* Avatar skeleton */}
            <div className="skeleton-avatar">
              <div className="skeleton circle"></div>
            </div>
            {/* User info skeleton - only visible on larger screens */}
            <div className="skeleton-info">
              <div className="skeleton line large"></div>
              <div className="skeleton line small"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
