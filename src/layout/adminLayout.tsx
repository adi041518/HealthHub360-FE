import { useEffect, useState } from "react";
import DynamicGrid from "../components/agGrid";
import Menubar from "../components/menubar";
import NavbarComponent from "../components/navbar";
import { menuAdminbar } from "../config/menubar";
import { fetchAllTenants } from "../axios/tenant";
import { fetchAllHospital } from "../axios/hospital";

// 🔥 Import your real APIs


const Adminlayout = () => {
    const role = "superadmin"; // get this from token in real case
    const menuBar = menuAdminbar[role] || [];

    const [selectedMenu, setSelectedMenu] = useState<string>("");
    const [rowData, setRowData] = useState<any[]>([]);


    const apiMap: Record<string, () => Promise<any>> = {
        Tenants: fetchAllTenants,
        Hospitals: fetchAllHospital,
    };


    const fetchData = async (key: string) => {
        try {
            const apiFunction = apiMap[key];
            if (!apiFunction) {
                console.error("No API mapped for:", key);
                setRowData([]);
                return;
            }

            const response = await apiFunction();
            setRowData(response.data.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setRowData([]);
        } finally {

        }
    };

    // ✅ Default load first menu item
    useEffect(() => {
        if (menuBar.length > 0) {
            const defaultKey = menuBar[0].title;
            setSelectedMenu(defaultKey);
            fetchData(defaultKey);
        }
    }, []);

    const handleMenuClick = (key: string) => {
        setSelectedMenu(key);
        fetchData(key);
    };

    return (
        <>
            <NavbarComponent />

            {/* Menu Bar */}
            <div
                style={{
                    display: "flex",
                    height: "85px",
                    width: "100%",
                    backgroundColor: "#f8f9fa",
                    alignItems: "center",
                }}
            >
                <Menubar
                    menubar={menuBar}
                    onClick={handleMenuClick}
                    selectedMenu={selectedMenu}
                />
            </div>

            {/* Grid */}
            <div style={{ flex: 1, padding: "20px" }}>
                <DynamicGrid rowData={rowData}  type={selectedMenu === "Tenants" ? "tenant" : "hospital"} />
            </div>

        </>
    );
};

export default Adminlayout;
