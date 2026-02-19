interface MenuItem {
 title:string
}

interface MenubarProps {
  menubar: MenuItem[];
  onClick: (key: string) => void;
  selectedMenu: string;
}

const Menubar: React.FC<MenubarProps> = ({
  menubar,
  onClick,
  selectedMenu,
}) => {
  return (
    <div style={{ display: "flex", gap: "25px", paddingLeft: "20px" }}>
      {menubar.map((item) => (
        <div
          key={item.title}
          onClick={() => onClick(item.title)}
          style={{
            cursor: "pointer",
            padding: "8px 12px",
            borderBottom:
              selectedMenu === item.title ? "3px solid #0EA5A4" : "none",
            fontWeight: selectedMenu === item.title ? "600" : "400",
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Menubar;
