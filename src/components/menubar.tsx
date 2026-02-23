import React from "react";

interface MenuItem<T> {
  title: string;
  module: T;
}

interface MenubarProps<T> {
  menubar: MenuItem<T>[];
  onClick: (key: string, module: T) => void;
  selectedMenu: string;
}

function Menubar<T>({
  menubar,
  onClick,
  selectedMenu,
}: MenubarProps<T>) {
  return (
    <div
      style={{
        display: "flex",
        gap: "25px",
        paddingLeft: "20px",
      }}
    >
      {menubar.map((item) => (
        <div
          key={item.title}
          onClick={() => onClick(item.title, item.module)}
          style={{
            cursor: "pointer",
            padding: "8px 12px",
            borderBottom:
              selectedMenu === item.title
                ? "3px solid #0EA5A4"
                : "none",
            fontWeight:
              selectedMenu === item.title ? 600 : 400,
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default Menubar;
