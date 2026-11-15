import React from 'react'
import "./member.css"
import { Image } from 'react-bootstrap'

const Member = ({ imgLink, name, linkedin }) => {
  return (
    <div className="member">
      <a className="member_a" href={linkedin} target="_blank" rel="noreferrer">
        <Image src={imgLink} fluid alt={name} className="pb-3 imgMember" />
      </a>
      <p>{name}</p>
    </div>
  );
};

export default Member