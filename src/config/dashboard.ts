import admin from "../assets/admin.png"
import billing from "../assets/billing.png"
import roles from "../assets/roles.png"
export const dashboardCards = {
  superadmin: [
    { title: "ADMIN", path: "/dashboard/admin",description:"Manages all The users from here",image:admin },
    { title: "BILLING", path: "/dashboard/billing",description:"Manages all Your billing From here",image:billing },
    { title: "ROLES", path: "/dashboard/roles" ,description:"Manages all Ur roles here",image:roles},
  ],
  tenant: [
    { title: "Admin", path: "/dashboard/admin",description:"Manages All the Users From here",image:admin },
    { title: "Billing", path: "/dashboard/billing",description:"Manages all Your billing From here",image:billing},
  ],
  doctor: [
    { title: "Patients", path: "/dashboard/patients" },
    { title: "Appointments", path: "/dashboard/appointments" },
  ],
};
