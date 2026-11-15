import { useState, useEffect } from "react";
import jordisPic from "../Assets/img/team/jordis.jpg";
import adonisPic from "../Assets/img/team/adonis.jpg";
import winserPic from "../Assets/img/team/winser.jpg";

export const useMemberData = () => {
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const members = [
      {
        name: "Adonis De Paula",
        picture: adonisPic,
        linkedin: "https://www.linkedin.com/in/adonsfco/",
      },
      {
        name: "Winser Espinal",
        picture: winserPic,
        linkedin: "https://www.linkedin.com/in/winser-espinal/",
      },
      {
        name: "Juan Tomas De peña",
        picture: jordisPic,
        linkedin: "https://www.linkedin.com/in/juan-tomas-de-pena-medina/",
      },
    ];

    setMemberData(members);
  }, []);

  return [memberData, setMemberData];
};

export default useMemberData;
