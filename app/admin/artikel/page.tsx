import { ArticlesAdminClient } from "../articles/Client";

export const metadata = {
  title: "Kelola Artikel — Admin CVKu",
};

export default function AdminArtikelPage() {
  return <ArticlesAdminClient type="article" typeLabel="Artikel" />;
}