import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

//needs to be scrollable
export const Page = (props: PageProps) => {
  const { children } = props;

  return (
    <div className="bg-[#eff1ed] overflow-auto h-auto p-4">
      {children}
    </div>
  );
};
