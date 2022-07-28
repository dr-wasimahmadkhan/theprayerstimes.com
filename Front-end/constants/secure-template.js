const routes = (isAdmin, Role) =>{
  let customRoutes = [];
  if (isAdmin) {
    customRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        layout: "/admin",
      },
      {
        path: "/mosques",
        name: "Mosques",
        icon: "ni ni-book-bookmark text-orange",
        layout: "/admin",
      },
      {
        path: "/users",
        name: "Users",
        icon: "ni ni-single-copy-04 text-pink",
        layout: "/admin",
      },
      {
        path: "/complains",
        name: "Complains",
        icon: "ni ni-button-play text-yellow",
        layout: "/admin",
      },
      {
        path: "/management",
        name: "Management",
        icon: "ni ni-ui-04 text-pink",
        layout: "/admin",
      },
      {
        path: "/contacts",
        name: "Contacts",
        icon: "ni ni-collection text-info",
        layout: "/admin",
      },
      // {
      //   path: "/settings",
      //   name: "Settings",
      //   icon: "ni ni-collection text-yellow",
      //   layout: "/admin",
      // },
    ];
  }
  if (Role === 'user' && !isAdmin) {
    customRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        layout: "/admin",
      },
      {
        path: "/mosque",
        name: "Mosque",
        icon: "ni ni-image text-yellow",
        layout: "/admin",
      },
    ];
  }
  if (Role === 'customer_care' && !isAdmin) {
    customRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        layout: "/admin",
      },
      {
        path: "/complains",
        name: "Complains",
        icon: "ni ni-button-play text-yellow",
        layout: "/admin",
      },
      {
        path: "/contacts",
        name: "Contacts",
        icon: "ni ni-collection text-info",
        layout: "/admin",
      },
    ];
  }
  return customRoutes;
};

export default routes;
