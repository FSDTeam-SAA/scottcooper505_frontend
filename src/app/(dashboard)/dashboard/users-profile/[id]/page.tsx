import React from "react";
import SingleUserContainer from "./_components/single-user-container";

const SingleUserPage = ({
  userId,
  open,
  onOpenChange,
  params
}: {
  userId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  params: { id: string };
}) => {
  console.log(params?.id)
  return (
    <div>
      <SingleUserContainer id={userId || ""} open={open} onOpenChange={onOpenChange}/>
    </div>
  );
};

export default SingleUserPage;
