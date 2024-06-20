import React from 'react';
import "./Profile.scss";
import Avatar from "../../assets/images/AvatarImageIhab.jpg";

const userInfo = {
  name: 'Ihab Ahmad',
  email: 'ihab@example.com',
  phone: '+1231243124',
  address: 'Tripoli lebanon',
};

const activities = [
  { time: '2024-06-19', text: 'Logged in' },
  { time: '2024-06-18', text: 'Updated profile' },
  { time: '2024-06-17', text: 'Changed password' },
];

const Profile = () => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src={Avatar} alt="Profile" />
            <h1>{userInfo.name}</h1>
            <button className='buttonUp'>Update</button>
          </div>
          <div className="details">
            {Object.entries(userInfo).map(([key, value]) => (
              <div className="item" key={key}>
                <span className="itemTitle">{key}</span>
                <span className="itemValue">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="chart">
          {/* The chart can be added here */}
        </div>
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        <ul>
          {activities.map((activity) => (
            <li key={activity.text}>
              <div>
                <p>{activity.text}</p>
                <time>{activity.time}</time>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
