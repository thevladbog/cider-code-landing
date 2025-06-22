import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Head } from "./head";

interface DefaultLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

export default function DefaultLayout({
  children,
  title,
  description,
  keywords,
  image,
  url,
  type,
  noindex,
}: DefaultLayoutProps) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Head
        description={description}
        image={image}
        keywords={keywords}
        noindex={noindex}
        title={title}
        type={type}
        url={url}
      />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
