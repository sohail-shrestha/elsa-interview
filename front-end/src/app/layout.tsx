import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default HomeLayout;
