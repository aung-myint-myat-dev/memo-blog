import "../css/app.css"

import { createInertiaApp } from '@inertiajs/react'
import AppLayout from './layouts/AppLayout'
import GuestLayout from "./layouts/GuestLayout";
import SubPageLayout from "./layouts/SubPageLayout";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import ConfirmModal from "./components/app/ConfirmModal";

createInertiaApp({
  title: (title) => title ? `${title} - Memo` : 'Memo',
  layout: (name) => {
    if (name.startsWith('Blog/') || name.startsWith('Profile/')) {
      return SubPageLayout;
    }
    if (name.startsWith('Guest') || name.startsWith('Auth/')) {
      return GuestLayout;
    }
    return AppLayout;
  },
  setup({ el, App, props }) {
    if (el) {
      createRoot(el).render(
        <ThemeProvider>
          <App {...props} />
        </ThemeProvider>
      )
    }
  },
}
);