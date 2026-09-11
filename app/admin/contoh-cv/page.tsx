import { ArticlesAdminClient } from "../articles/Client";

export const metadata = {
  title: "Kelola Contoh CV Dinamis — Admin CVKu",
};

export default function AdminContohCVPage() {
  return <ArticlesAdminClient type="cv_example" typeLabel="Contoh CV" />;
}