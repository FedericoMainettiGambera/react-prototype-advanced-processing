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
          {location.pathname.startsWith("/users") && <BreadcrumbLink href="/users">Utenti</BreadcrumbLink>}
          {location.pathname.startsWith("/devices") && <BreadcrumbLink href="/devices">Dispositivi</BreadcrumbLink>}
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>TODO</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
