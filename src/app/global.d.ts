interface User {
  id: string;
  name: string;
  email: string;
  userType: "worker" | "contractor";
  bio: string;
  skills: string[];
  rate: {
    rateType: "Hourly" | "Daily";
    rate: number;
  };
  country: string;
  province: string;
  area: string;
  profilePicture: string;
  phoneNumber: string;
}
