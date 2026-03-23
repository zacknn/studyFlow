import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}