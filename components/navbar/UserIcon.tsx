import { LuUser } from "react-icons/lu";
import { currentUser } from "@clerk/nextjs/server";

async function UserIcon() {
  let profileImage = null;

  try {
    const user = await currentUser();
    profileImage = user?.imageUrl;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt="User profile"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }

  return <LuUser className="w-6 h-6 bg-primary rounded-full text-white" />;
}

export default UserIcon;
