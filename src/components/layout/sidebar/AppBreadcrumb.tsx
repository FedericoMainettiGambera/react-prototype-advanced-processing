import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router";

export default function AppBreadcrumb() {
  const location = useLocation();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          {location.pathname.startsWith("/users") && <BreadcrumbLink href="#">Utenti</BreadcrumbLink>}
          {location.pathname.startsWith("/devices") && <BreadcrumbLink href="#">Dispositivi</BreadcrumbLink>}
          {location.pathname.startsWith("/services") && <BreadcrumbLink href="#">Servizi</BreadcrumbLink>}
          {location.pathname.startsWith("/settings") && <BreadcrumbLink href="#">Impostazioni</BreadcrumbLink>}
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
